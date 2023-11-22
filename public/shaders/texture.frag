#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D texture2;
varying vec2 vUv;

float scale = 1.0;
float step = 0.025;

void main() {
  //Dimensiones de la textura
  ivec2 tex_size = textureSize(texture2, 0);
  //Desplazamiento según dimensión tetxura
  vec2 texOffset = vec2(1.0/float( tex_size.x ), 1.0/float( tex_size.y ));

  // Vecinos del píxel actual según desplazamiento de la textura
  vec2 tc0 = vUv.st + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = vUv.st + vec2(         0.0, -texOffset.t);
  vec2 tc2 = vUv.st + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = vUv.st + vec2(-texOffset.s,          0.0);
  vec2 tc4 = vUv.st + vec2(         0.0,          0.0);
  vec2 tc5 = vUv.st + vec2(+texOffset.s,          0.0);
  vec2 tc6 = vUv.st + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = vUv.st + vec2(         0.0, +texOffset.t);
  vec2 tc8 = vUv.st + vec2(+texOffset.s, +texOffset.t);

  //Color de cada vecino
  vec4 col0 = texture2D(texture2, tc0);
  vec4 col1 = texture2D(texture2, tc1);
  vec4 col2 = texture2D(texture2, tc2);
  vec4 col3 = texture2D(texture2, tc3);
  vec4 col4 = texture2D(texture2, tc4);
  vec4 col5 = texture2D(texture2, tc5);
  vec4 col6 = texture2D(texture2, tc6);
  vec4 col7 = texture2D(texture2, tc7);
  vec4 col8 = texture2D(texture2, tc8);

  //Aplicamos filtros
  //Gaussiana
  vec4 sum = (1.0 * col0 + 2.0 * col1 + 1.0 * col2 +  
                        2.0 * col3 + 4.0 * col4 + 2.0 * col5 +
                        1.0 * col6 + 2.0 * col7 + 1.0 * col8) / 16.0;

  //Sobel
  vec4 sum2 = abs((1.0 * col0 + 2.0 * col1 + 1.0 * col2) - (1.0 * col6 + 2.0 * col7 + 1.0 * col8)) * 10.0;

  gl_FragColor = vec4(sum2.rgb, 1.0);
}