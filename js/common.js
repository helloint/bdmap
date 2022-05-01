const pointsInfo = [];

/**
 * 添加标注到地图中
 * @param text 文本
 * @param lng 经度
 * @param lat 纬度
 */
function addPosition(text, lng, lat, dataType0, dataType1, styleType) {
	var label = new BMapGL.Label(text, {position: new BMapGL.Point(lng, lat)});
	var textSize = styleType ? 14 : 20;
	var color = colors1[dataType0];
	label.setStyle({
		color: '#fff',
		width: textSize + 'px',
		textAlign: 'center',
		borderColor: dataType1 ? colors2[dataType1] : colors1[dataType0],
		borderWidth: '2px',
		borderRadius: '5px',
		backgroundColor: color,
		lineHeight: textSize + 'px',
		transform: 'translate(-50%,-50%)',
	});
	// FIXME: doesn't work
	// label.addEventListener("mouseover", function (e) {
	// 	this.setZIndex(currMakerZIndex++);
	// });
	map.addOverlay(label);
}

// var currMakerZIndex = 10;

// 小区轮廓
function drawOutline() {
	var outlinePolygon = new BMapGL.Polygon(outlinePoints.map((position) => {
		return new BMapGL.Point(...position);
	}), {strokeColor: 'blue', strokeWeight: 1, strokeOpacity: 0.5, fillColor: 'blue', fillOpacity: 0.05});
	map.addOverlay(outlinePolygon);

	var squarePolygon = new BMapGL.Polygon(squarePoints.map((position) => {
		return new BMapGL.Point(...position);
	}), {strokeColor: 'black', strokeWeight: 1, strokeOpacity: 1, fillOpacity: 0});
	map.addOverlay(squarePolygon);
}

// 标题
function drawTitle() {
	if (mapTitle) {
		var titleOpts = {
			position: new BMapGL.Point(...mapTitlePosition),
		};
		var titleLabel = new BMapGL.Label(mapTitle, titleOpts);
		titleLabel.setStyle({
			color: 'gray',
			borderRadius: '5px',
			borderColor: '#ccc',
			padding: '10px',
			fontSize: '16px',
			fontFamily: '微软雅黑',
			transform: 'translate(-50%,-50%)',
		});
		map.addOverlay(titleLabel);
	}
}

// 作者信息
function printAuthor() {
	if (mapAuthor) {
		var authorOpts = {
			position: new BMapGL.Point(...mapAuthorPosition),
		};
		var authorLabel = new BMapGL.Label(mapAuthor, authorOpts);
		authorLabel.setStyle({
			color: 'gray',
			borderRadius: '5px',
			borderColor: '#ccc',
			fontSize: '12px',
			fontFamily: '微软雅黑',
			transform: 'translate(-50%,-50%)',
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
		fontFamily: '微软雅黑',
		transform: 'translate(-50%,-50%)',
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
