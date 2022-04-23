const pointsInfo = [];

/**
 * 添加标注到地图中
 * @param text 文本
 * @param lng 经度
 * @param lat 纬度
 */
function addPosition(text, lng, lat, dataType0, dataType1, styleType) {
	var point = new BMapGL.Point(lng, lat);
	var marker = new BMapGL.Marker(point);
	var textSize = styleType ? 14 : 20;
	// 没办法去除icon，所以否则只能搞个透明的png取代
	var icon = new BMapGL.Icon('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC', new BMapGL.Size(textSize, textSize));
	marker.setIcon(icon);
	var offsetFix = [-3, -3];
	var label = new BMapGL.Label(text, {offset: new BMapGL.Size(-textSize / 2 + offsetFix[0], -textSize / 2 + offsetFix[1])});
	var color = colors1[dataType0];
	label.setStyle({
		color: '#fff',
		width: textSize + 'px',
		textAlign: 'center',
		borderColor: dataType1 ? colors2[dataType1] : colors1[dataType0],
		borderWidth: '2px',
		borderRadius: '5px',
		backgroundColor: color,
		lineHeight: textSize + 'px'
	});
	marker.setLabel(label);
	// FIXME: doesn't work
	// marker.addEventListener('hover mouseenter', function (e) {
	// 	marker.setZIndex(currMakerZIndex++);
	// });
	map.addOverlay(marker);
}

// 小区轮廓
function drawOutline() {
	var outlinePolygon = new BMapGL.Polygon(outlinePoints.map((position) => {
		return new BMapGL.Point(...position);
	}), {strokeColor: 'blue', strokeWeight: 1, strokeOpacity: 0.5, fillColor: 'blue', fillOpacity: 0.05});
	map.addOverlay(outlinePolygon);
}

// 标题
function drawTitle() {
	if (mapTitle) {
		var titleOpts = {
			position: new BMapGL.Point(...mapTitlePosition),
			offset: new BMapGL.Size(0, 0),
		};
		var titleLabel = new BMapGL.Label(mapTitle, titleOpts);
		titleLabel.setStyle({
			color: 'gray',
			borderRadius: '5px',
			borderColor: '#ccc',
			padding: '10px',
			fontSize: '16px',
			fontFamily: '微软雅黑'
		});
		map.addOverlay(titleLabel);
	}
}

// 作者信息
function printAuthor() {
	if (mapAuthor) {
		var authorOpts = {
			position: new BMapGL.Point(...mapAuthorPosition),
			offset: new BMapGL.Size(0, 0) // 设置文本偏移量
		};
		var authorLabel = new BMapGL.Label(mapAuthor, authorOpts);
		authorLabel.setStyle({
			color: 'gray',
			borderRadius: '5px',
			borderColor: '#ccc',
			fontSize: '12px',
			fontFamily: '微软雅黑'
		});
		map.addOverlay(authorLabel);
	}
}

// 版本号
function printVersion() {
	var versionOpts = {
		position: new BMapGL.Point(...versionPosition),
		offset: new BMapGL.Size(0, 0) // 设置文本偏移量
	};
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1)
			: now.getMonth() + 1;
	var day = now.getDate() < 10 ? '0' + now.getDate() : now
			.getDate();
	var version = [versionPrefix, year, month, day, '.', now.getHours()].join('');
	var versionLabel = new BMapGL.Label(version, versionOpts);
	versionLabel.setStyle({
		color: 'gray',
		borderRadius: '5px',
		borderColor: '#ccc',
		fontSize: '12px',
		fontFamily: '微软雅黑'
	});
	versionLabel.addEventListener('click', function (e) {
		console.log(pointsInfo.join('\n'));
	});
	map.addOverlay(versionLabel);
}

function initMap() {
	if (mapTitle) {
		document.title = mapTitle;
	}

	var point = new BMapGL.Point(...mapPosition);
	map.centerAndZoom(point, mapZoom); // 设置中心点坐标和地图级别
	map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
	map.setZoom(mapZoom);

	map.addEventListener('click', function (e) {
		pointsInfo.push(`['', ${e.latlng.lng}, ${e.latlng.lat}],`);
	});

	map.addEventListener('dblclick', function (e) {
		e.stopPropagation();
	});

	map.addEventListener("zoomend", function () {
		var currZoom = this.getZoom();
		console.log(`currentZoom: ${currZoom}`);
	});
}
