# 🚀 Guía Completa: Solucionar Problemas de Rendimiento Gráfico en Manjaro

## 📋 Resumen del Problema Detectado

Tu sistema Manjaro con GPU AMD Radeon RX 550 experimenta problemas intermitentes de rendimiento gráfico (cursor lagueado, transiciones lentas) debido a varios factores:

### ⚠️ Problemas Identificados:
1. **Sin SWAP configurado** (ya solucionado ✅)
2. **Carga alta del sistema** (4.0+ load average)
3. **Temperatura CPU elevada** (71.9°C)
4. **Múltiples aplicaciones pesadas** (Cursor, Chrome, Teams)
5. **GPU en modo automático** (puede throttling)

## 🛠️ Soluciones Implementadas

### 1. ✅ SWAP Configurado
- **4GB de swap añadido**
- **Configuración permanente** en `/etc/fstab`
- **Estado actual**: Activo y usando 603MB

### 2. ⚡ Scripts de Diagnóstico y Optimización
- `diagnostico_rendimiento.sh` - Para detectar problemas
- `optimizacion_rendimiento.sh` - Para aplicar mejoras

## 🔧 Comandos Útiles para Monitoreo

### Monitoreo en Tiempo Real:
```bash
# Uso de GPU en tiempo real
watch -n 1 'cat /sys/class/drm/card0/device/gpu_busy_percent 2>/dev/null'

# Temperatura GPU y CPU
watch -n 2 'sensors | grep -E "(edge|Tctl)"'

# Procesos que más CPU usan
watch -n 3 'ps aux --sort=-%cpu | head -10'

# Uso de memoria y swap
watch -n 2 'free -h'
```

### Comandos de Diagnóstico Rápido:
```bash
# Estado completo del sistema
./diagnostico_rendimiento.sh

# Verificar estado de GPU
cat /sys/class/drm/card0/device/power_dpm_force_performance_level

# Verificar gobernador CPU
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor

# Procesos gráficos pesados
ps aux | grep -E "(chrome|cursor|teams|firefox)" | grep -v grep
```

## 🎯 Optimizaciones Automáticas

### Para Aplicar Cuando Detectes Problemas:
```bash
# Ejecutar script de optimización
./optimizacion_rendimiento.sh
```

### Optimizaciones Manuales Específicas:

#### 🔥 Cuando el Sistema Esté Lento:
```bash
# Limpiar cachés
sudo sync && echo 3 | sudo tee /proc/sys/vm/drop_caches

# GPU en alto rendimiento
echo 'high' | sudo tee /sys/class/drm/card0/device/power_dpm_force_performance_level

# CPU en modo rendimiento (temporal)
echo 'performance' | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```

#### 🖱️ Cuando el Cursor Esté Lagueado:
```bash
# Reiniciar compositor KWin
qdbus org.kde.KWin /Compositor suspend && sleep 1 && qdbus org.kde.KWin /Compositor resume

# Verificar procesos pesados
ps aux --sort=-%cpu | head -10

# Cerrar procesos innecesarios de Chrome
pkill -f "chrome.*--type=renderer" 2>/dev/null || true
```

## 📊 Valores de Referencia Normales

### 🟢 Estado Saludable:
- **Uso GPU**: 0-30% en reposo, <80% bajo carga
- **Temperatura CPU**: <65°C en reposo, <80°C bajo carga
- **Load Average**: <2.0 para uso normal
- **Memoria libre**: >15% disponible
- **Swap usado**: <50% del total

### 🔴 Estado Problemático:
- **Uso GPU**: >80% constante
- **Temperatura CPU**: >75°C constante
- **Load Average**: >4.0 sostenido
- **Memoria libre**: <10% disponible
- **Swap usado**: >80% del total

## 🔄 Rutina de Mantenimiento

### Diario (Automático):
```bash
# Añadir al crontab para ejecución automática
# crontab -e
# 0 9 * * * /ruta/al/optimizacion_rendimiento.sh
```

### Semanal (Manual):
```bash
# Limpiar paquetes huérfanos
sudo pacman -Rns $(pacman -Qtdq) 2>/dev/null || true

# Actualizar sistema
sudo pacman -Syu

# Limpiar caché de pacman
sudo pacman -Sc
```

## 🚨 Acciones de Emergencia

### Si el Sistema se Vuelve Muy Lento:
1. **Ejecuta**: `./optimizacion_rendimiento.sh`
2. **Cierra aplicaciones pesadas** temporalmente
3. **Reinicia el compositor**: `kwin_x11 --replace &`
4. **Como último recurso**: Reinicia el sistema

### Revertir Optimizaciones:
```bash
# Volver GPU a modo automático
echo 'auto' | sudo tee /sys/class/drm/card0/device/power_dpm_force_performance_level

# Volver CPU a modo automático
echo 'schedutil' | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```

## 📝 Notas Importantes

1. **Los problemas intermitentes** suelen ser por acumulación de procesos pesados
2. **El swap configurado** debería prevenir muchos problemas de memoria
3. **Monitorea la temperatura** - si sube mucho, puede haber throttling
4. **Chrome consume muchos recursos** - considera cerrar pestañas innecesarias
5. **Cursor/VSCode** son aplicaciones electron pesadas - normales consumos altos

## 🔗 Archivos Creados

- `diagnostico_rendimiento.sh` - Script de diagnóstico completo
- `optimizacion_rendimiento.sh` - Script de optimización automática
- `GUIA_RENDIMIENTO_MANJARO.md` - Esta guía (para referencia futura)

## 📞 Cuándo Contactar Soporte

Si después de aplicar estas optimizaciones sigues teniendo problemas:
1. Ejecuta `./diagnostico_rendimiento.sh` y guarda la salida
2. Anota cuándo ocurren los problemas específicamente
3. Verifica si hay actualizaciones de drivers AMD disponibles
4. Considera si el problema comenzó después de alguna actualización específica 