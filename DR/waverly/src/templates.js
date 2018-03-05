// Handlebars tamplates
var Handlebars = require('./js/handlebars.min.js');
var local_exec_head = Handlebars.compile(`			<table class='nobord'><tr>
				<td><input ID='opener' name="file" type="file" accept=".wav,.WAV" /></td>
				<!--
				<td><input type="button" value="Open" style="width:55pt" onclick="btn_open()" ></td>
				<td><input type="button" value="Save(F1)" style="width:55pt" onclick="btn_save()"></td>
				-->
			</tr>
			</table>`);

var local_exec_info = Handlebars.compile(`
You are running the local version of Waverly.
`);


var sfx_dropdn_template = Handlebars.compile(`<button class="dropbtn">Effects &#x25bc;</button>
	<div class="dropdown-content">
	<a id='openfilter'>Quad Filter</a>
	<a id='openReverb'>Simple Reverb</a>
 </div>`);


var quad_dropdn_template = Handlebars.compile(`<button id='quadpop' class="dropbtn">Lowpass Filter &#x25bc;</button>
	<div class="dropdown-content">
	<a id='itmlowpass'>Lowpass Filter</a>
	<a id='itmhighpass'>Highpass Filter</a>
	<a id='itmbandpass'>Bandpass Filter</a>
	<a id='itmlowshelf'>Lowshelf Filter</a>
	<a id='itmhighshelf'>Highshelf Filter</a>
	<a id='itmpeaking'>Peaking Filter</a>
	<a id='itmnotch'>Notch Filter</a>
	<a id='itmallpass'>Allpass Filter</a>
 </div>`);
Handlebars.registerPartial("quaddropdn", quad_dropdn_template);

var filter_frame_template = Handlebars.compile(`<div id='filterhdr'>
<button class="butn" id='fl_apply'>Apply</button>
<button class="butn" id='fl_cancel'>Close</button>
<input type='checkbox' id='fl_audition' checked>Audition</input>
<div id ='filterbody'>
</div>
</div>
`);

// Handlebars.registerPartial("filterheader", filterheader);

var quadfilter_template = Handlebars.compile(`<div id='quadfilter'>
<table>
<tr>
<td><div id='quaddropdn'>{{> quaddropdn}}</div></td>
<td><input id='qf_frequency' type="text" value="440" class="dial" data-min="1" data-max="8000" data-angleArc="300" data-angleOffset="30" data-width='128' data-height='128'></td>
<td><div class='q_div'><input id='qf_Q' type="text" value="1" class="dial" data-min="0" data-max="50" data-angleArc="300" data-angleOffset="30" data-width='128' data-height='128'</div></td>
<td><div class='gain_div'><input id='qf_gain' type="text" value="0" class="dial" data-min="-40" data-max="40" data-angleArc="300" data-angleOffset="30" data-width='128' data-height='128'></div></td>
</tr>
<tr>
<th>Kind</th>
<th>Frequency</th>
<th><div class='q_div'>Q</div></th>
<th><div class='gain_div'>Gain</div></th>
</tr>
</table>
</div>
`);

var reverb_template = Handlebars.compile(`<div id='simplereverb'>
<table>
<tr>
<td><input id='qf_drylevel' type="text" value="5" class="dial" data-min="0" data-max="10" data-step='0.1' data-angleArc="300" data-angleOffset="210" data-width='128' data-height='128'></td>
<td><input id='qf_wetlevel' type="text" value="5" class="dial" data-min="0" data-max="10" data-step='0.1' data-angleArc="300" data-angleOffset="210" data-width='128' data-height='128'></td>
<td><input id='qf_seconds' type="text" value="3" class="dial" data-min="0" data-max="30"  data-step='0.1' data-angleArc="300" data-angleOffset="210" data-width='128' data-height='128'></td>
<td><input id='qf_decay' type="text" value="2" class="dial" data-min="0" data-max="100" data-angleArc="300" data-angleOffset="210" data-width='128' data-height='128'></td>
<td><input id='qf_reverse' type="text" value="0" class="dial" data-min="0" data-max="1" data-angleArc="300" data-angleOffset="210" data-width='128' data-height='128'></td>
</tr>
<tr>
<th>Dry Level</th>
<th>Wet Level</th>
<th>Seconds</th>
<th>Decay</th>
<th>Reverse</th>
</tr>
</table>
</div>
`);

export {sfx_dropdn_template, local_exec_head, local_exec_info, filter_frame_template, quadfilter_template, quad_dropdn_template, reverb_template};