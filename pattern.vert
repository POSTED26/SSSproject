// make this 120 for the mac:
#version 330 compatibility

// out variables to be interpolated in the rasterizer and sent to each fragment shader:

out  vec2  vST;	  // (s,t) texture coordinates
out  vec3  vN;	  // normal vector
out  vec3  vL;	  // vector from point to light
out  vec3  vE;	  // vector from point to eye
out  vec3  vC;		// vector from point to center of sphere
out  vec3  vMC;  // model coord
out	 float vThick; // thickness of sphere there

uniform float uA;
uniform float uP;

// where the light is:


uniform float lightPosX;
uniform float lightPosY;
uniform float lightPosZ;

void
main( )
{
	vec4 vert = gl_Vertex;
	vec3 LightPosition = vec3(lightPosX,lightPosY,lightPosZ);


	vST = gl_MultiTexCoord0.st;
	vMC = gl_Vertex.xyz;
	vec4 ECposition = gl_ModelViewMatrix * vert;
	vN = normalize( gl_NormalMatrix * gl_Normal );  // normal vector
	
	vL = LightPosition - ECposition.xyz;	    // vector from the point
							// to the light position
	vE = vec3( 0., 0., 0. ) - ECposition.xyz;       // vector from the point
							// to the eye position

	vC = gl_Vertex.xyz - vec3(0.,0.,0.);
	vec3 vLn = normalize(vL);
	float angle = acos(dot(vC, vLn));
	float bAngle = angle + angle - 180.0;
	vThick = 2.0 * sin(bAngle/2.0);


	gl_Position = gl_ModelViewProjectionMatrix * vert;
}
