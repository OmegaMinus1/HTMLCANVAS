var VSHADER_SOURCE =
         '#version 100\n' +
         'attribute vec4 a_Position;\n' +
         'void main(){\n' +
         '   gl_Position = a_Position;\n' +
         '}\n';

var FSHADER_SOURCE =
        '#version 100\n' +
        'precision mediump float;\n' +
        'uniform float iTime;\n' +
        'uniform vec2 iResolution;\n' +

        'vec2 rotate(vec2 pos, float angle)\n' +
        '{\n' +
        '   float c = cos(angle);\n' +
        '   float s = sin(angle);\n' +
        '	\n' +
        '   return mat2(c, s, -s, c) * pos;\n' +
        '}\n' +
        
        'float plane(vec3 pos)\n' +
        '{\n' +
        '   return pos.y;\n' +
        '}\n' +
        
        'float sphere(vec3 pos, float radius)\n' +
        '{\n' +
        '   return length(pos) - radius;\n' +
        '}\n' +
        
        'float box(vec3 pos, vec3 size)\n' +
        '{\n' +
        '   return length(max(abs(pos) - size, 0.0));\n' +
        '}\n' +
        
        'float roundedBox(vec3 pos, vec3 size, float radius)\n' +
        '{\n' +
        '   return length(max(abs(pos) - size, 0.0)) - radius;\n' +
        '}\n' +
        
        'float map(vec3 pos)\n' +
        '{\n' +
        '   float planeDistance = plane(pos);\n' +
        '	\n' +
        '   pos.xy = rotate(pos.xy, pos.z * sin(iTime) * 0.01);\n' +
        '	\n' +
        '   pos.x = abs(pos.x);\n' +
        '	\n' +
        '   pos = mod(pos + 10.0, 20.0) - 10.0;\n' +
        '	\n' +
        '   pos.xy = rotate(pos.xy, iTime);\n' +
        '   pos.xz = rotate(pos.xz, iTime * 0.7);\n' +
        '	\n' +
        '   //if(iMouse.z > 0.0)\n' +
        '   //    return min(planeDistance, roundedBox(pos, vec3(2.0), 1.0));\n' +
        '   //else\n' +
        '       return min(planeDistance, sphere(pos, 3.0));\n' +
        '}\n' +
        
        'vec3 albedo(vec3 pos)\n' +
        '{\n' +
        '   return vec3(smoothstep(0.4, 0.41, fract(pos.x + sin(pos.z * 0.4 + iTime))));\n' +
	    '}\n' +

        '// noun\n' +
        '// (physics) the proportion of the total light striking the surface of an object, \n' +
        '// such as a planet, which is reflected from that surface\n' +
        'vec3 material(vec3 pos)\n' +
        '{\n' +
        '   return vec3(smoothstep(0.4, 0.41, fract(pos.x + sin(pos.z * 0.4 + iTime))));\n' +
        '	\n' +
        '}\n' +
        
        'vec3 computeNormal(vec3 pos)\n' +
        '{\n' +
        '   vec2 eps = vec2(0.01, 0.0);\n' +
        '   return normalize(vec3(\n' +
        '   map(pos + eps.xyy) - map(pos - eps.xyy), \n' +
        '   map(pos + eps.yxy) - map(pos - eps.yxy), \n' +
        '   map(pos + eps.yyx) - map(pos - eps.yyx)));\n' +
        '	\n' +
        '}\n' +
        
        'float diffuse(vec3 normal, vec3 lightDirection)\n' +
        '{\n' +
        '   // return max(dot(normal, lightDirection), 0.0);\n' +
        '   // wrap lighting\n' +
        '   return dot(normal, lightDirection) * 0.5 + 0.5;\n' +
        '}\n' +
        
        'float specular(vec3 normal, vec3 dir)\n' +
        '{\n' +
        '   // IBL\n' +
        '   vec3 h = normalize(normal - dir);\n' +
        '   return pow(max(dot(h, normal), 0.0), 100.0);\n' +
        '}\n' +

        'void main(){\n' +
        'vec2 fragCoord = gl_FragCoord.xy;\n'+

        'vec2 vUV = (fragCoord.xy / iResolution.xy);\n' +
        'vec2 vViewCoord = vUV * 2.0 - 1.0;\n' +
	
        'float fRatio = iResolution.x / iResolution.y;\n' +
        'vViewCoord.y /= fRatio;\n' +
	
        'vec2 uv = vViewCoord;\n' +
	
        'vec3 pos = vec3(sin(iTime * 0.2) * 4.0, 5.0 + sin(iTime * 0.4) * 3.0, -13.0);\n' +
        'vec3 dir = normalize(vec3(uv, 1.0));\n' +
	
        '// Ray March \n' +
        'for(int i = 0;i < 64;i++)\n' +
        '{\n' +
        '    float d = map(pos);\n' +
        '    pos += d * dir;\n' +
        '}\n' +
	
        'vec3 normal = computeNormal(pos);\n' +
		
        'vec3 lightPos = vec3(0.0, 100.0, -100.0);\n' +
        'vec3 dirToLight = normalize(lightPos - pos);\n' +
        'vec3 posToLight = pos + (0.001 * dirToLight);\n' +
	
        'float fShadowBias = 0.05;\n' +
        'float fStartDistance = fShadowBias / abs(dot(dirToLight, normal));\n' +
        'float fLightDistance = 100.0;\n' +
        'float fLength = fLightDistance - fStartDistance;\n' +
	
        'float posToLightDistance = 0.0;\n' +
        'for(int i = 0;i < 64;i++)\n' +
        '{\n' +
        '    float d = map(posToLight);\n' +
        '    posToLightDistance += d;\n' +
        '    posToLight += d * dirToLight;\n' +
        '}\n' +
        	
        'float fShadow = step(0.0, posToLightDistance) * step(fLightDistance, posToLightDistance);		\n' +
        	
        'float fAmbientOcclusion = 1.0;\n' +
        	
        'float fDist = 0.0;\n' +
        'for(int i = 0;i <= 5;i++)\n' +
        '{\n' +
        '    fDist += 0.1;\n' +
        		
        '    float d = map(pos + normal * fDist);\n' +
        		
        '    fAmbientOcclusion *= 1.0 - max(0.0,(fDist - d) * 0.2 / fDist);\n' +
        '}\n' +
        	
        '// get colour from reflected ray\n' +
        'float fSeparation = 0.1;\n' +
        'fLength = 160.0;\n' +
        	
        'vec3 dirReflected = reflect(dir, normal);\n' +
        'fStartDistance = fSeparation / abs(dot(dirReflected, normal));\n' +
        	
        'vec3 posReflected = pos + (0.001 * dirReflected);\n' +
	
        'float posReflectedDistance = 0.0;\n' +
        'for(int i = 0;i < 64;i++)\n' +
        '{\n' +
        '    float d = map(posReflected);\n' +
        '    posReflectedDistance += d;\n' +
        '    posReflected += d * dirReflected;\n' +
        '}\n' +
	
        'float fReflected = step(0.0, posReflectedDistance) * step(fLength, posReflectedDistance);\n' +
        	
        'float diffReflected = diffuse(normal, dirReflected);\n' +
        'float specReflected = specular(normal, dir);\n' +
    	
        'vec3 colorReflected = (diffReflected + specReflected) * vec3(0.0, 0.2, 0.81) * (1.0 - fReflected) * material(posReflected);\n' +
	
        'float diff = diffuse(normal, dirToLight);\n' +
        'float spec = specular(normal, dir);\n' +
        'vec3 color = (diff + spec) * vec3(0.0, 0.2, 0.81) *  material(pos);\n' +
	
        'float fogFactor = exp(-pos.z * 0.01);\n' +
        'vec3 fogColor = vec3(0.0, 0.2, 0.81);\n' +
	
        'color = mix(clamp(color + colorReflected, 0.0,1.0), clamp(color + colorReflected, 0.0,1.0) * 0.25, 1.0 - fShadow);\n' +
        'color = mix(fogColor, fAmbientOcclusion * color, fogFactor);\n' +
	
        '//color = abs(dirReflected);\n' +
        '//color = abs(dirToLight);\n' +
        '//color = abs(normal);\n' +
        '//color = vec3(fAmbientOcclusion);\n' +
        '//color = colorReflected;\n' +
        
        '   gl_FragColor = vec4(color, 1.0);\n' +
        '}\n';


	