export class RNG {
  m_w = 123456789;
  m_z = 987654321;
  mask = 0xffffffff;

  constructor(seed) {
    this.m_w = (123456789 + seed) & this.mask;
    this.m_z = (987654321 - seed) & this.mask;
  }

  // Returns number between 0 (inclusive) and 1.0 (exclusive),
  // just like Math.random().
  random() {
      this.m_z = (36969 * (this.m_z & 65535) + (this.m_z >> 16)) & this.mask;
      this.m_w = (18000 * (this.m_w & 65535) + (this.m_w >> 16)) & this.mask;
      let result = ((this.m_z << 16) + (this.m_w & 65535)) >>> 0;
      result /= 4294967296;
      return result;
  }
}

/**
 * Este código implementa un generador de números pseudoaleatorios con seed, 
 * y se usa en proyectos de Three.js cuando se necesita que el “azar” sea siempre 
 * el mismo para un mismo valor inicial. A diferencia de Math.random(), 
 * que cambia en cada ejecución, este RNG permite crear mundos, terrenos, partículas 
 * o animaciones procedurales que se generen siempre igual, lo cual es esencial para depurar, 
 * sincronizar simulaciones, reproducir escenas de forma exacta o compartir un mismo mundo en 
 * juegos tipo voxel usando solo un seed. En resumen, da un “azar controlado” que garantiza 
 * resultados reproducibles en cualquier navegador.
 */

/**
 * ¿Por qué no usar Math.random()?

Porque este RNG:
-es rápido
-es determinista
-permite seed reproducibles
-funciona igual en todos los navegadores
 */