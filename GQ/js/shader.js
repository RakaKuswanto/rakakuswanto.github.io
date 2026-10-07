/* GymQuest — Luxury Obsidian & Topographic Silk Shader Background.
 * Renders an exclusive, dark, hypnotic liquid obsidian surface with
 * subtle topographic contour guilloché and champagne-lime platinum specular glints.
 * Ultra-refined, minimalist, and authoritative.
 */
(function (GQ) {
  'use strict';

  const VERTEX_SHADER_SRC = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  // Haute Horlogerie / Bespoke Liquid Obsidian Topography Fragment Shader
  const FRAGMENT_SHADER_SRC = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;

    // Organic multi-scale fluid surface
    float surface(vec2 p, float t) {
      float v = 0.0;
      // Primary slow obsidian swell
      v += 0.52 * sin(p.x * 1.35 + p.y * 1.10 + t * 0.35);
      // Cross swell
      v += 0.36 * cos(p.x * 2.10 - p.y * 1.75 - t * 0.28);
      // Domain warp coordinate displacement
      vec2 warp = vec2(v, -v) * 0.55;
      v += 0.26 * sin((p.x + warp.x) * 3.2 + (p.y + warp.y) * 2.6 + t * 0.42);
      // Micro silk ripple
      v += 0.14 * cos(p.x * 4.8 - p.y * 3.8 + v * 1.8 + t * 0.52);
      return v;
    }

    void main() {
      // Coordinate normalization
      vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      float t = u_time * 0.20; // Dignified, calm, slow luxury cadence

      // Aspect scaled coordinate space
      vec2 p = uv * 2.6;

      // Subtle diagonal tilt for refined natural flow
      float ang = 0.38;
      mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
      p = rot * p;

      float h = surface(p, t);

      // ── 1. Luxury Topographic Iso-contours (Guilloché Dial Effect) ──
      // Primary delicate contour rings
      float contour1 = abs(fract(h * 3.6) - 0.5);
      float line1 = smoothstep(0.040, 0.008, contour1);

      // Micro accent contour rings
      float contour2 = abs(fract(h * 7.2 + 0.25) - 0.5);
      float line2 = smoothstep(0.026, 0.005, contour2) * 0.45;

      // ── 2. Refined Specular Light Glide ──
      // Dynamic soft studio spotlight gliding across the dark silk
      vec2 lightCenter = vec2(sin(t * 0.7) * 0.45, cos(t * 0.5) * 0.65);
      float lightDist = length(uv - lightCenter);
      float specular = pow(max(0.0, 1.0 - lightDist * 0.65), 3.0) * smoothstep(-0.25, 0.75, h);

      // ── 3. Exclusive Dark Palette: Obsidian, Smoked Titanium & Gold-Lime ──
      // Deep onyx & dark graphite backdrop
      vec3 obsidianBase = mix(vec3(0.018, 0.022, 0.030), vec3(0.035, 0.042, 0.055), uv.y + 0.5);
      
      // Smoked carbon titanium midtone
      vec3 titanium = vec3(0.10, 0.12, 0.16);

      // Refined stealth champagne-lime (subtle, non-tacky luxury hue)
      vec3 goldLime = vec3(0.78, 0.96, 0.15);

      // Polished platinum glint
      vec3 platinum = vec3(0.88, 0.92, 0.96);

      vec3 col = obsidianBase;

      // Add titanium depth gradient
      col += titanium * smoothstep(-0.6, 0.8, h) * 0.38;

      // Add subtle topographic contour lines
      col += goldLime * line1 * 0.26;
      col += titanium * line2 * 0.20;

      // Edge illumination on curved wave crests
      float crestGlow = smoothstep(0.40, 0.85, h);
      col += goldLime * crestGlow * 0.24;

      // Specular sheen along silk ribbons
      col += platinum * specular * 0.28;
      col += goldLime * specular * 0.16;

      // Micro carbon grain / fine dither to prevent any color banding
      float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) * 0.012;
      col += vec3(grain);

      // Elegant ambient vignette
      float vignette = smoothstep(1.35, 0.35, length(uv * vec2(1.0, 0.88)));
      col *= (0.72 + 0.28 * vignette);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  class ShaderBackground {
    constructor(canvas) {
      this.canvas = canvas;
      this.gl = null;
      this.program = null;
      this.buffer = null;
      this.animId = null;
      this.startTime = Date.now();
      this.is2DFallback = false;

      this.initContext();
    }

    initContext() {
      if (!this.canvas) return;

      const opts = {
        alpha: false,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance'
      };

      try {
        this.gl = this.canvas.getContext('webgl2', opts) ||
                  this.canvas.getContext('webgl', opts) ||
                  this.canvas.getContext('experimental-webgl', opts);
      } catch (e) {
        console.warn('GymQuest Shader: WebGL context creation failed:', e);
      }

      if (this.gl) {
        this.initWebGL();
      } else {
        console.warn('GymQuest Shader: WebGL not supported, falling back to 2D luxury silk engine.');
        this.is2DFallback = true;
      }
    }

    initWebGL() {
      const gl = this.gl;
      const vs = this.compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
      const fs = this.compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);

      if (!vs || !fs) {
        this.is2DFallback = true;
        this.gl = null;
        return;
      }

      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('GymQuest Shader: Link error:', gl.getProgramInfoLog(program));
        this.is2DFallback = true;
        this.gl = null;
        return;
      }

      this.program = program;

      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1.0, -1.0,
           1.0, -1.0,
          -1.0,  1.0,
          -1.0,  1.0,
           1.0, -1.0,
           1.0,  1.0
        ]),
        gl.STATIC_DRAW
      );

      this.posAttr = gl.getAttribLocation(program, 'a_position');
      this.resUniform = gl.getUniformLocation(program, 'u_resolution');
      this.timeUniform = gl.getUniformLocation(program, 'u_time');
    }

    compileShader(type, src) {
      const gl = this.gl;
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);

      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('GymQuest Shader compile error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    start() {
      this.stop();
      this.startTime = Date.now();

      if (this.is2DFallback) {
        this.start2DFallback();
        return;
      }

      const gl = this.gl;
      if (!gl || !this.program) return;

      const render = () => {
        const parent = this.canvas.parentElement;
        const rect = this.canvas.getBoundingClientRect();
        const displayW = Math.max(rect.width || (parent ? parent.clientWidth : 0) || 360, 100);
        const displayH = Math.max(rect.height || (parent ? parent.clientHeight : 0) || 580, 100);

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const pixelW = Math.round(displayW * dpr);
        const pixelH = Math.round(displayH * dpr);

        if (this.canvas.width !== pixelW || this.canvas.height !== pixelH) {
          this.canvas.width = pixelW;
          this.canvas.height = pixelH;
        }

        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.useProgram(this.program);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.enableVertexAttribArray(this.posAttr);
        gl.vertexAttribPointer(this.posAttr, 2, gl.FLOAT, false, 0, 0);

        gl.uniform2f(this.resUniform, this.canvas.width, this.canvas.height);
        gl.uniform1f(this.timeUniform, (Date.now() - this.startTime) / 1000);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        this.animId = requestAnimationFrame(render);
      };

      this.animId = requestAnimationFrame(render);
    }

    start2DFallback() {
      const ctx = this.canvas.getContext('2d');
      if (!ctx) return;

      const render2D = () => {
        const parent = this.canvas.parentElement;
        const rect = this.canvas.getBoundingClientRect();
        const displayW = Math.max(rect.width || (parent ? parent.clientWidth : 0) || 360, 100);
        const displayH = Math.max(rect.height || (parent ? parent.clientHeight : 0) || 580, 100);

        if (this.canvas.width !== displayW || this.canvas.height !== displayH) {
          this.canvas.width = displayW;
          this.canvas.height = displayH;
        }

        const W = this.canvas.width;
        const H = this.canvas.height;
        const t = (Date.now() - this.startTime) / 1000 * 0.25;

        // Luxury Dark Obsidian background
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#040608');
        grad.addColorStop(0.5, '#080c12');
        grad.addColorStop(1, '#020305');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // Elegant flowing silk contour waves
        for (let i = 0; i < 5; i++) {
          const wavePhase = t + i * 0.45;
          ctx.beginPath();
          ctx.strokeStyle = i === 2 ? 'rgba(212, 255, 0, 0.25)' : 'rgba(255, 255, 255, 0.06)';
          ctx.lineWidth = i === 2 ? 1.5 : 1;

          for (let x = 0; x <= W; x += 6) {
            const y = H * 0.35 + (i * 45) +
                      Math.sin(x * 0.008 + wavePhase) * 35 +
                      Math.cos(x * 0.004 - wavePhase * 0.6) * 20;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        this.animId = requestAnimationFrame(render2D);
      };

      this.animId = requestAnimationFrame(render2D);
    }

    stop() {
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    }
  }

  GQ.ShaderBackground = ShaderBackground;
})(window.GQ);
