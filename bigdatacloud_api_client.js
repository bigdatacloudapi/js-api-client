;(function(_w,$) {
	var BDC=function(apiKey,nameSpace,server) {
		this.apiKey=apiKey;
		this.nameSpace=nameSpace ? nameSpace : 'data';
		this.server=server ? server : 'api.bigdatacloud.net';
	};
	BDC.prototype={
		call:function(endpoint,payload,successCb,errorCb,method) {
			var data=[];
			var hasKey=false;

			if (!method) method='GET';
			else method=method.toUpperCase();

			var params={
				url:'https://'+this.server+'/'+this.nameSpace+'/'+endpoint,
				type:method,
				success:successCb,
				error:errorCb,
				dataType:'json'
			};
			if (payload) {
				for (var i in payload) {
					if (i=='key') {
						hasKey=true;
					}
					data.push(encodeURIComponent(i)+'='+encodeURIComponent(payload[i]));
				}
			}
			if (!hasKey) data.push('key='+this.apiKey);

			data=data.join('&');

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