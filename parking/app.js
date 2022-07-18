const pointsInfo = [];
const crossIcon = new BMapGL.Icon('../images/cross.svg', new BMapGL.Size(15, 15));

function initMap() {
	if (mapTitle) {
		document.title = mapTitle;
	}

	var point = new BMapGL.Point(...mapPosition);
	map.setMapStyleV2({
		styleJson: [{
			"featureType": "road",
			"elementType": "geometry",
			"stylers": {
				"visibility": "on"
			}
		}, {
			"featureType": "road",
			"elementType": "labels",
			"stylers": {
				"visibility": "on"
			}
		}, {
			"featureType": "districtlabel",
			"elementType": "labels",
			"stylers": {
				"visibility": "on"
			}
		}, {
			"featureType": "districtlabel",
			"elementType": "labels.icon",
			"stylers": {
				"visibility": "on"
			}
		}, {
			"featureType": "poilabel",
			"elementType": "labels",
			"stylers": {
				"visibility": "off"
			}
		}, {
			"featureType": "poilabel",
			"elementType": "labels.icon",
			"stylers": {
				"visibility": "off"
			}
		}, {
			"featureType": "background",
			"elementType": "geometry",
			"stylers": {
				"visibility": "on"
			}
		}]
	});
	map.centerAndZoom(point, mapZoom); // 设置中心点坐标和地图级别
	map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
	map.setZoom(mapZoom);
	mapHeading && map.setHeading(mapHeading); // 设置地图的旋转角度

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

// var currMakerZIndex = 10;

/**
 * 添加标注到地图中
 * styleType: 0：默认12px，1：小字体，用户做示例，2：车位图用，6px
 * @param text 文本
 * @param lng 经度
 * @param lat 纬度
 */
function addPosition(text, lng, lat, dataType0, dataType1, styleType) {
	var label = new BMapGL.Label(text, {position: new BMapGL.Point(lng, lat)});
	var styleSize = styleType === 1 ? 14 : styleType === 2 ? 12 : 20;
	var borderRadius = styleType === 3 ? 15 : 5;
	var fontSize = styleType === 2 ? 8 : 12;
	var color = styleType === 3 ? colors1[dataType0] : '#fff';
	var backgroundColor = styleType === 3 ? 'transparent' : colors1[dataType0];
	label.setStyle({
		color: color,
		fontSize: `${fontSize}px`,
		width: `${styleSize}px`,
		textAlign: 'center',
		borderColor: dataType1 ? colors2[dataType1] : colors1[dataType0],
		borderWidth: '2px',
		borderRadius: `${borderRadius}px`,
		backgroundColor: backgroundColor,
		lineHeight: `${styleSize}px`,
		transform: 'translate(-50%,-50%)',
	});
	// FIXME: doesn't work
	// label.addEventListener("mouseover", function (e) {
	// 	this.setZIndex(currMakerZIndex++);
	// });
	map.addOverlay(label);
}

// 小区轮廓
function drawOutline() {
	var outlinePolygon = new BMapGL.Polygon(outlinePoints.map((position) => {
		return new BMapGL.Point(...position);
	}), {strokeColor: 'blue', strokeWeight: 1, strokeOpacity: 0.5, fillColor: 'blue', fillOpacity: 0.05});
	map.addOverlay(outlinePolygon);

	if (squarePoints && squarePoints.length > 0) {
		squarePoints.forEach(point => {
			var marker = new BMapGL.Marker(new BMapGL.Point(point[0], point[1]));
			marker.setIcon(crossIcon);
			map.addOverlay(marker);
		});
	}
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
			padding: '5px',
			fontSize: '14px',
			fontFamily: '微软雅黑',
			transform: 'translate(-50%,-50%)',
		});
		map.addOverlay(titleLabel);
	}
}

// 图例文字
function drawDesc() {
	if (descriptions) {
		descriptions.forEach(desc => {
			var opts = {
				position: new BMapGL.Point(desc[0], desc[1]),
				offset: new BMapGL.Size(0, 0) // 设置文本偏移量
			};
			var label = new BMapGL.Label(desc[2], opts);
			label.setStyle({
				color: 'gray',
				borderRadius: '5px',
				borderColor: '#ccc',
				fontSize: '12px',
				fontFamily: '微软雅黑',
				transform: 'translate(-50%,-50%)',
			});
			map.addOverlay(label);
		});
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
