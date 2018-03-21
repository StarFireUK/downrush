cd /Users/jamie/deluge/downrush/xmlView
npm run build
cd /Users/jamie/deluge/downrush/waverly
npm run build
cd /Users/jamie/deluge
rm -rf distribution
mkdir distribution
cd /Users/jamie/deluge/downrush
pandoc -f markdown  -t plain --wrap=auto  README.md -o  ~/deluge/distribution/README.txt
pandoc -f markdown  -t plain --wrap=auto  MANUAL.md -o  ~/deluge/distribution/MANUAL.txt
cp -R SD_WLAN ~/deluge/distribution/.
cp -R DR  ~/deluge/distribution/.
#cp -R ../tools  ~/deluge/distribution/.
cd /Users/jamie/deluge
rm  downrush.zip
zip -r downrush.zip distribution