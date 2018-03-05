import $ from'./js/jquery-3.2.1.min.js';
import {filter_frame_template} from'./templates.js';
import {OfflineContext} from './AudioCtx.js';

var createOfflineContext  = function (buffer) {
	let {numberOfChannels, sampleRate} = buffer;
	return new OfflineContext(numberOfChannels, buffer.getChannelData(0).length, sampleRate);
}

// Abstract super class for a filter object.
class FilterBase {
	constructor(template) {
		this.template = template;
	}

	openGui(whereToPut) {
		$(whereToPut).append (this.template());
	}

	// Get the current state of all the filter parameters.
	getState() {
		return {};
	}

	// Set the state of the filter parameters to the filter chain
	applyState(state) {
		
	}

	createFilters(ctx) {
		this.filters = [];
	}

	connectFilters(source, dest) {
		this.source = source;
		this.dest = dest;
		if(this.filters) {
			let prevFilter = source;
			for (var i = 0; i < this.filters.length; ++i) {
				let thisFilter = this.filters[i];
				prevFilter.connect(thisFilter);
				prevFilter = thisFilter;
			}
			prevFilter.connect(dest);
		}
	}

	disconnectFilters() {
		if (this.filters) {
			this.filters.forEach(function (filter) {
				filter && filter.disconnect();
			});
		}
		// Reconnect the direct path
		this.source.connect(this.dest);
	}
};

class FilterFrame {
  constructor(wave) {
		this.wave = wave;
  }

  close() {
	if(this.filter) {
		this.filter.disconnectFilters();
		this.filter = undefined;
	}
  }

  connectToWave() {
	this.wave.backend.analyser.disconnect();
	this.filter.connectFilters(this.wave.backend.analyser, this.wave.backend.gainNode);
  }


  open(filterClass) {
		this.filterClass = filterClass;
		this.filter = new filterClass();
		$('#procmods').empty();
		let frameText = filter_frame_template();
		$('#procmods').append(frameText);
		this.filter.createFilters(this.wave.audioContext);
		this.filter.openGui('#filterbody');
		this.connectToWave()
		this.openGui();
	}

	openGui() {
	$('#fl_cancel').on('click', e=>{
		this.connectToWave();
		if(this.filter) {
			this.filter.disconnectFilters();
		}
		$('#procmods').empty();
	});

	$('#fl_audition').on('click', e=>{
		if (e.target.checked) {
			this.connectToWave();
		} else {
			this.filter.disconnectFilters();
		}
	});

	$('#fl_apply').on('click', e=>{
		$('#fl_audition').prop('checked', false);
		this.applyFilters();
		this.filter.disconnectFilters();
	});
  }

  applyFilters() {
	let working = this.wave.copySelected();
	let ctx = createOfflineContext(working);

	// create offline version of filter chain.
	let offlineFilter = new this.filterClass();
	offlineFilter.createFilters(ctx);

	// Create simulated wavesurfer filter environment.
	let offlineSource = ctx.createBufferSource();
/*
	let offlineGain = ctx.createGain();
	offlineGain.connect(ctx.destination);

	let offlineAnalyser = ctx.createAnalyser();
	offlineSource.connect(offlineAnalyser);
	offlineAnalyser.connect(offlineGain);

	offlineAnalyser.disconnect();
*/
	offlineFilter.connectFilters(offlineSource, ctx.destination);

	let state = this.filter.getState();
	offlineFilter.applyState(state);

	offlineSource.buffer = working;
	let that = this;
	ctx.oncomplete = function (e) {
		that.wave.pasteSelected(e.renderedBuffer);
	}
	offlineSource.start();
	ctx.startRendering();
  }

};

export {FilterBase, FilterFrame};