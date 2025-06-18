// make this 120 for the mac:
#version 330 compatibility

// lighting uniform variables -- these can be set once and left alone:
uniform float   uKa, uKd, uKs;	 // coefficients of each type of lighting -- make sum to 1.0
//uniform vec4    uColor;		 // object color
//uniform vec4    uSpecularColor;	 // light color
uniform float   uShininess;	 // specular exponent

// square-equation uniform variables -- these should be set every time Display( ) is called:

//uniform float   uS0, uT0, uD;

uniform float	uAd, uBd;
uniform float	uTol;
uniform float	uNoiseFreq;
uniform float	uNoiseAmp;
uniform sampler3D Noise3;
uniform float	wrap;


// in variables from the vertex shader and interpolated in the rasterizer:

in  vec3  vN;		   // normal vector
in  vec3  vL;		   // vector from point to light
in  vec3  vE;		   // vector from point to eye
in  vec2  vST;		   // (s,t) texture coordinates
in  vec3  vMC;		  // Model coords
//in  float NdotL;
in  float vThick;

const vec3 OBJECTCOLOR			= vec3(0.9,0.7,0.1);
const vec3 ELLIPSECOLOR			= vec3(1.,0.,0.);
const vec3 SPECULARCOLOR		= vec3(1.,1.,1.);


void
main( )
{


	vec2 st = vST;



	// determine the color using the square-boundary equations:

	vec3 myColor = OBJECTCOLOR;
	







	myColor = OBJECTCOLOR;

	float sssColor = exp(-vThick * 0.3);// * vec3(1.,1.,1.);

	// apply the per-fragmewnt lighting to myColor:

	vec3 Normal = normalize(vN);
	vec3 Light  = normalize(vL);
	vec3 Eye    = normalize(vE);

	vec3 ambient = uKa * myColor;

	float dd = max( dot(Normal,Light), 0. );       // only do diffuse if the light can see the point
	float wrapD = max(0, (dot(Light,Normal) + wrap) / (1 + wrap));
	vec3 diffuse = uKd * sssColor * myColor;

	float ss = 0.;
	if( dot(Normal,Light) > 0. )	      // only do specular if the light can see the point
	{
		vec3 ref = normalize(  reflect( -Light, Normal )  );
		ss = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec3 specular = uKs * ss * SPECULARCOLOR.rgb;
	gl_FragColor = vec4( ambient + diffuse + specular,  1. );
}

