const mapPosition = [121.392716, 31.134039];
const mapZoom = 20;
const outlinePoints = [
	[121.39120010945183, 31.13448562717948],
	[121.3931112544243, 31.13494444586192],
	[121.39332684774669, 31.134149480701076],
	[121.39402078875315, 31.134268291231777],
	[121.3942229074929, 31.133713840802642],
	[121.3920085844108, 31.133170978500477],
];
const mapTitle = '春意苑小区车位分布图';
const titlePosition = [121.39221744044188, 31.134147040684304];
const mapAuthor = 'Wayne';
const authorPosition = [121.39222193196943, 31.134557564248855];
const versionPrefix = '';
const versionPosition = [121.39201981322968, 31.1332921799735];
const loggerPosition = [121.39240159307143, 31.13426971497276];
const testMarkerPosition = [121.39227358453626, 31.13392004453113];

const getOffsetIndex = function (text) {
	return text === '黄' ? 2 : text === '空' || text === '无' ? 1 : 0;
}
