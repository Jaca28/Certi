var fileHashOutput;
document.forms['filehash'].elements['myfilehash'].onchange = function(evt) {
    if(!window.FileReader) return; // Browser is not compatible

    var reader = new FileReader();

    reader.onload = function(evt) {
        if(evt.target.readyState != 2) return;
        if(evt.target.error) {
            alert('Error while reading file');
            return;
        }

        filecontent = evt.target.result;
        console.log("Archivo Leido:"+filecontent);
        fileHashOutput=CryptoJS.SHA256(filecontent);
        document.getElementById("file_hash").innerHTML='CertiBits - Hash: '+fileHashOutput;
        console.log("Hash:"+fileHashOutput);
    };

    reader.readAsText(evt.target.files[0]);
};

// function sha256script(ascii) {
// 	function rightRotate(value, amount) {
// 		return (value>>>amount) | (value<<(32 - amount));
// 	};
	
// 	var mathPow = Math.pow;
// 	var maxWord = mathPow(2, 32);
// 	var lengthProperty = 'length'
// 	var i, j; // Used as a counter across the whole file
// 	var result = ''

// 	var words = [];
// 	var asciiBitLength = ascii[lengthProperty]*8;
	
// 	//* caching results is optional - remove/add slash from front of this line to toggle
// 	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
// 	// (we actually calculate the first 64, but extra values are just ignored)
// 	var hash = sha256.h = sha256.h || [];
// 	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
// 	var k = sha256.k = sha256.k || [];
// 	var primeCounter = k[lengthProperty];
// 	/*/
// 	var hash = [], k = [];
// 	var primeCounter = 0;
// 	//*/

// 	var isComposite = {};
// 	for (var candidate = 2; primeCounter < 64; candidate++) {
// 		if (!isComposite[candidate]) {
// 			for (i = 0; i < 313; i += candidate) {
// 				isComposite[i] = candidate;
// 			}
// 			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
// 			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
// 		}
// 	}
	
// 	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
// 	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
// 	for (i = 0; i < ascii[lengthProperty]; i++) {
// 		j = ascii.charCodeAt(i);
// 		if (j>>8) return; // ASCII check: only accept characters in range 0-255
// 		words[i>>2] |= j << ((3 - i)%4)*8;
// 	}
// 	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
// 	words[words[lengthProperty]] = (asciiBitLength)
	
// 	// process each chunk
// 	for (j = 0; j < words[lengthProperty];) {
// 		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
// 		var oldHash = hash;
// 		// This is now the undefinedworking hash", often labelled as variables a...g
// 		// (we have to truncate as well, otherwise extra entries at the end accumulate
// 		hash = hash.slice(0, 8);
		
// 		for (i = 0; i < 64; i++) {
// 			var i2 = i + j;
// 			// Expand the message into 64 words
// 			// Used below if 
// 			var w15 = w[i - 15], w2 = w[i - 2];

// 			// Iterate
// 			var a = hash[0], e = hash[4];
// 			var temp1 = hash[7]
// 				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
// 				+ ((e&hash[5])^((~e)&hash[6])) // ch
// 				+ k[i]
// 				// Expand the message schedule if needed
// 				+ (w[i] = (i < 16) ? w[i] : (
// 						w[i - 16]
// 						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
// 						+ w[i - 7]
// 						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
// 					)|0
// 				);
// 			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
// 			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
// 				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
			
// 			hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
// 			hash[4] = (hash[4] + temp1)|0;
// 		}
		
// 		for (i = 0; i < 8; i++) {
// 			hash[i] = (hash[i] + oldHash[i])|0;
// 		}
// 	}
	
// 	for (i = 0; i < 8; i++) {
// 		for (j = 3; j + 1; j--) {
// 			var b = (hash[i]>>(j*8))&255;
// 			result += ((b < 16) ? 0 : '') + b.toString(16);
// 		}
// 	}
// 	return result;
// };

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(h,s){var f={},t=f.lib={},g=function(){},j=t.Base={extend:function(a){g.prototype=this;var c=new g;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
q=t.WordArray=j.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||u).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=j.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new q.init(c,a)}}),v=f.enc={},u=v.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
2),16)<<24-4*(b%8);return new q.init(d,c/2)}},k=v.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new q.init(d,c)}},l=v.Utf8={stringify:function(a){try{return decodeURIComponent(escape(k.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return k.parse(unescape(encodeURIComponent(a)))}},
x=t.BufferedBlockAlgorithm=j.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=l.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var m=0;m<a;m+=e)this._doProcessBlock(d,m);m=d.splice(0,a);c.sigBytes-=b}return new q.init(m,b)},clone:function(){var a=j.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});t.Hasher=x.extend({cfg:j.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){x.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new w.HMAC.init(a,
d)).finalize(c)}}});var w=f.algo={};return f}(Math);
(function(h){for(var s=CryptoJS,f=s.lib,t=f.WordArray,g=f.Hasher,f=s.algo,j=[],q=[],v=function(a){return 4294967296*(a-(a|0))|0},u=2,k=0;64>k;){var l;a:{l=u;for(var x=h.sqrt(l),w=2;w<=x;w++)if(!(l%w)){l=!1;break a}l=!0}l&&(8>k&&(j[k]=v(h.pow(u,0.5))),q[k]=v(h.pow(u,1/3)),k++);u++}var a=[],f=f.SHA256=g.extend({_doReset:function(){this._hash=new t.init(j.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],m=b[2],h=b[3],p=b[4],j=b[5],k=b[6],l=b[7],n=0;64>n;n++){if(16>n)a[n]=
c[d+n]|0;else{var r=a[n-15],g=a[n-2];a[n]=((r<<25|r>>>7)^(r<<14|r>>>18)^r>>>3)+a[n-7]+((g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10)+a[n-16]}r=l+((p<<26|p>>>6)^(p<<21|p>>>11)^(p<<7|p>>>25))+(p&j^~p&k)+q[n]+a[n];g=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&m^f&m);l=k;k=j;j=p;p=h+r|0;h=m;m=f;f=e;e=r+g|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+m|0;b[3]=b[3]+h|0;b[4]=b[4]+p|0;b[5]=b[5]+j|0;b[6]=b[6]+k|0;b[7]=b[7]+l|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=g.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=g._createHelper(f);s.HmacSHA256=g._createHmacHelper(f)})(Math);