uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float grosor=0.1;

float plot(vec2 st, float pct){
  //smoothstep da salida suave entre dos valores (Hermite)
  return  smoothstep( pct-grosor, pct, st.y) -
  smoothstep( pct, pct+grosor, st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec2 mouse= u_mouse/u_resolution.xy;

  vec3 color = vec3(st.x);	//Escala de grises izquierda a derecha;

  //Valor a tomar como referencia para bordes suaves
  float val = pow(st.x,1.0+mouse.x*10.0);

  //Combina escala con línea según el valor de pct
  float pct = plot(st,val);
  // Valores altos verde, bajos escala de grises
  color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

  gl_FragColor = vec4(color,1.0);
}
