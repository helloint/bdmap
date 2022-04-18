const mapPosition = [121.392716, 31.134039];
const mapZoom = 19;
const outlinePoints = [
	[121.39120010945183, 31.13448562717948],
	[121.3931112544243, 31.13494444586192],
	[121.39332684774669, 31.134149480701076],
	[121.39402078875315, 31.134268291231777],
	[121.3942229074929, 31.133713840802642],
	[121.3920085844108, 31.133170978500477],
];
const mapTitle = '';
const titlePosition = [121.39221744044188, 31.134147040684304];
const mapAuthor = '';
const authorPosition = [121.39222193196943, 31.134557564248855];
const blockList = ['核','4','12'];
const blackList = ['抗'];
const versionPrefix = '截止时间：';
const versionPosition = [121.39221744044188, 31.13416442760108];
const loggerPosition = [121.39076667704326, 31.13367759271479];
const testMarkerPosition = [121.39227358453626, 31.13392004453113];

const getOffsetIndex = function (text) {
	return blockList.includes(text) ? 0 : blackList.includes(text) ? 2 : 1;
}
