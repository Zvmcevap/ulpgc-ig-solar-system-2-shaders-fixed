uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 mouse = u_mouse/u_resolution;
    gl_FragColor = vec4(u_mouse.x,u_mouse.y,abs(sin(u_time)),1.000);
}