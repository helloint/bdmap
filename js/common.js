const pointsInfo = [];

/**
 * 添加标注到地图中
 * @param text 文本
 * @param lng 经度
 * @param lat 纬度
 */
function addPosition(text, lng, lat) {
	var point = new BMap.Point(lng, lat);
	var marker = new BMap.Marker(point); // 创建标注
	var offsetIndex = getOffsetIndex(text);
	marker.setIcon(new BMap.Icon('../images/tooltip.gif',
			new BMap.Size(34, 24),
			{
				anchor: new BMap.Size(7 + 3 * (text.length - 1), 24),
				imageOffset: new BMap.Size(offsetIndex * -34, (text.length - 1) * -30)
			}
	));
	var label = new BMap.Label(text, {offset: new BMap.Size(3, 0)});
	label.setStyle({
		background: 'none', color: '#fff', border: 'none'
	});
	marker.setLabel(label);
	map.addOverlay(marker);
}

function addBlocked(text, lng, lat) {
	var point = new BMap.Point(lng, lat);
	var marker = new BMap.Marker(point); // 创建标注
	marker.setIcon(new BMap.Icon('../images/square.png',
		new BMap.Size(32, 32),
		{
			anchor: new BMap.Size(14, 28),
		}
	));
	var label = new BMap.Label(text, {offset: new BMap.Size(3, 0)});
	label.setStyle({
		background: 'none', color: '#fff', border: 'none'
	});
	marker.setLabel(label);
	map.addOverlay(marker);
}

function addSamples(text, lng, lat) {
	var point = new BMap.Point(lng, lat);
	var marker = new BMap.Marker(point); // 创建标注
	marker.setIcon(new BMap.Icon('../images/square_s.png',
		new BMap.Size(20, 20),
		{
			anchor: new BMap.Size(6, 24),
		}
	));
	var label = new BMap.Label(text, {offset: new BMap.Size(3, 0)});
	label.setStyle({
		background: 'none', color: 'red', border: 'none'
	});
	marker.setLabel(label);
	map.addOverlay(marker);
}

function addTestMarker() {
	var myIcon = new BMap.Icon('http://api.map.baidu.com/img/markers.png', new BMap.Size(23, 25), {
		// 指定定位位置。
		// 当标注显示在地图上时，其所指向的地理位置距离图标左上
		// 角各偏移10像素和25像素。您可以看到在本例中该位置即是
		// 图标中央下端的尖角位置。
		anchor: new BMap.Size(10, 25),
		// 设置图片偏移。
		// 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
		// 需要指定大图的偏移位置，此做法与css sprites技术类似。
		imageOffset: new BMap.Size(0, 0 - 11 * 25)   // 设置图片偏移
	});
	var point = new BMap.Point(...testMarkerPosition);
	// 创建标注对象并添加到地图
	var marker = new BMap.Marker(point, {icon: myIcon});
	map.addOverlay(marker);
}

// 小区轮廓
function drawOutline() {
	var outlinePolygon = new BMap.Polygon(outlinePoints.map((position) => {
		return new BMap.Point(...position);
	}), {strokeColor: 'blue', strokeWeight: 1, strokeOpacity: 0, fillColor: 'none'});
	map.addOverlay(outlinePolygon);
}

// 标题
function drawTitle() {
	if (mapTitle) {
		var titleOpts = {
			position: new BMap.Point(...titlePosition),
			offset: new BMap.Size(0, 0),
		};
		var titleLabel = new BMap.Label(mapTitle, titleOpts);
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
			position: new BMap.Point(...authorPosition),
			offset: new BMap.Size(0, 0) // 设置文本偏移量
		};
		var authorLabel = new BMap.Label(mapAuthor, authorOpts);
		// 自定义文本标注样式
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
		position: new BMap.Point(...versionPosition),
		offset: new BMap.Size(0, 0) // 设置文本偏移量
	};
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1)
			: now.getMonth() + 1;
	var day = now.getDate() < 10 ? '0' + now.getDate() : now
			.getDate();
	var version = [versionPrefix, year, month, day, '.', now.getHours()].join('');
	var versionLabel = new BMap.Label(version, versionOpts);
	// 自定义文本标注样式
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
	var defaultMapType = map.getMapType();
	var defaultTileLayer = defaultMapType.getTileLayer();
	var newMapType = new BMap.MapType('新地图', defaultTileLayer, {minZoom: 15, maxZoom: 25});
	map.setMapType(newMapType);
	var point = new BMap.Point(...mapPosition);
	map.centerAndZoom(point, mapZoom); // 设置中心点坐标和地图级别
	map.setCurrentCity('上海'); // 设置地图显示的城市
	map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

	map.addEventListener('click', function (e) {
		pointsInfo.push(`['', ${e.point.lng}, ${e.point.lat}],`);
	});

	map.addEventListener('dblclick', function (e) {
		e.stopPropagation();
	});
}
