;(function(_w,$) {
	var BDC=function(apiKey,nameSpace,server,localityLanguage) {
		this.apiKey=apiKey;
		this.nameSpace=nameSpace ? nameSpace : 'data';
		this.server=server ? server : 'api.bigdatacloud.net';
		this.localityLanguage=localityLanguage ? localityLanguage : 'en';
	};
	BDC.prototype={
		call:function(endpoint,payload,successCb,errorCb,method) {
			if (!method) method='GET';
			else method=method.toUpperCase();
			var params={
				url:'https://'+this.server+'/'+this.nameSpace+'/'+endpoint,
				type:method,
				success:successCb,
				error:errorCb,
				dataType:'json'
			};

			var data=this.prepareData(payload,endpoint);

			switch(method) {
				case 'GET':
				case 'HEAD':
				params.url+=(params.url.indexOf('?')==-1 ? '?' : '&')+data;
				break;
				default:
				params.data=data;
				break;
			}
			return this.xhr(params);
		},
		prepareData:function(payload,endpoint) {
			var data=[];
			var hasKey=false;
			var hasLocalityLanguage=false;
			if (payload) {
				for (var i in payload) {
					switch(i) {
						case 'key':
						hasKey=true;
						break;
						case 'localityLanguage':
						hasLocalityLanguage=true;
						break;
					}
					data.push(encodeURIComponent(i)+'='+encodeURIComponent(payload[i]));
				}
			}
			if (!hasKey && this.apiKey) data.push('key='+this.apiKey);
			if (!hasLocalityLanguage) data.push('localityLanguage='+this.localityLanguage);
			data=data.join('&');
			return data;
		},
		xhr:function(params) {
			if ($) {
				var xhr=$.ajax(params);
			} else {
				var xhr = new XMLHttpRequest()
				xhr.open(params.type, params.url, true);
				xhr.onreadystatechange = function() {
					if (this.readyState === XMLHttpRequest.DONE) {
						if (this.status === 200) {
							try {
								if (params.success) {
									params.success(JSON.parse(this.responseText))
								}
							} catch (e) {
								if (params.error) {
									params.error(e)
								}
							}
						} else {
							if (params.error) {
								try {
									var result=JSON.parse(this.responseText);
									params.error(result,this.status);
								} catch (e) {
									params.error(this.responseText,this.status);
								}
							}
						}
					}
				}
				switch(params.type) {
					case 'PATCH':
					case 'POST':
					case 'PUT':
					xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					break;
					default:

					break;
				}
				xhr.send(params.data);
			}
			return xhr;
		},
		getClientCoordinates:function(cb) {
			if (!cb) return false;
			if (!navigator.geolocation || !navigator.geolocation.getCurrentPosition) return cb(false);
			return navigator.geolocation.getCurrentPosition(
				(function(position) { return this.cb(position);}).bind({cb:cb}),
				(function(err) { console.error(err); return this.cb(false);}).bind({cb:cb}),
				{
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0
				}
				);
		}
	}
	_w.BDCApiClient=BDC;
	if ($) {
		$.BDCApiClient=BDC;
		$.BDCApiClientInstance= new BDC();
		$.BDCApi=function(endpoint,params) {
			if (params.key) {
				$.BDCApiClientInstance.apiKey=params.key;
			}
			if (params.localityLanguage) {
				$.BDCApiClientInstance.setLanguage(params.localityLanguage);
			}
			if (params.nameSpace) {
				$.BDCApiClientInstance.nameSpace=params.nameSpace;
			}
			if (params.server) {
				$.BDCApiClientInstance.server=params.server;
			}
			return $.BDCApiClientInstance.call(
				endpoint,
				params.data ? params.data : false,
				params.success ? params.success : false,
				params.error ? params.error : false,
				params.method ? params.method : false
				);
		}
	}
})(window,typeof jQuery=='undefined' ? null : jQuery);