#!/bin/bash

# Script de Diagnóstico de Rendimiento Gráfico
# Para Manjaro con GPU AMD
# Creado para diagnosticar problemas intermitentes de rendimiento

echo "=== DIAGNÓSTICO DE RENDIMIENTO GRÁFICO ==="
echo "Fecha: $(date)"
echo "Usuario: $(whoami)"
echo ""

# Información del sistema
echo "=== INFORMACIÓN DEL SISTEMA ==="
echo "Kernel: $(uname -r)"
echo "Uptime: $(uptime)"
echo ""

# Estado de la GPU
echo "=== ESTADO DE LA GPU ==="
echo "Driver AMD en uso:"
lsmod | grep amdgpu
echo ""
echo "Información OpenGL:"
glxinfo | grep -E "(OpenGL vendor|OpenGL renderer|OpenGL version|direct rendering)" 2>/dev/null
echo ""
echo "Uso actual de GPU:"
cat /sys/class/drm/card0/device/gpu_busy_percent 2>/dev/null && echo "%" || echo "No disponible"
echo ""
echo "Temperatura GPU:"
sensors | grep -A5 "amdgpu"
echo ""

# Procesos más pesados
echo "=== PROCESOS QUE MÁS CPU CONSUMEN ==="
ps aux --sort=-%cpu | head -10
echo ""

# Memoria
echo "=== ESTADO DE LA MEMORIA ==="
free -h
echo ""

# Carga del sistema
echo "=== CARGA DEL SISTEMA ==="
cat /proc/loadavg
echo ""

# Temperatura CPU
echo "=== TEMPERATURA CPU ==="
sensors | grep -A10 "k10temp"
echo ""

# Procesos gráficos
echo "=== PROCESOS GRÁFICOS ACTIVOS ==="
ps aux | grep -E "(Xorg|kwin|plasmashell|chrome|firefox|cursor)" | grep -v grep
echo ""

# Compositor
echo "=== INFORMACIÓN DEL COMPOSITOR ==="
echo "Compositor activo: $(ps aux | grep kwin | grep -v grep | wc -l) procesos kwin"
qdbus org.kde.KWin /Compositor active 2>/dev/null && echo "KWin Compositor: Activo" || echo "KWin Compositor: Estado desconocido"
echo ""

# Logs recientes
echo "=== ERRORES RECIENTES DEL SISTEMA ==="
journalctl -p err --since "10 minutes ago" --no-pager | tail -5
echo ""

# Modo de ahorro de energía
echo "=== CONFIGURACIÓN DE ENERGÍA ==="
echo "Gobernador CPU actual:"
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor 2>/dev/null || echo "No disponible"
echo ""
echo "Perfil de energía AMD:"
cat /sys/class/drm/card0/device/power_dpm_force_performance_level 2>/dev/null || echo "No disponible"
echo ""

# Swap
echo "=== ESTADO DEL SWAP ==="
swapon --show
if [ $? -ne 0 ]; then
    echo "⚠️  ADVERTENCIA: No hay swap configurado"
fi
echo ""

echo "=== FIN DEL DIAGNÓSTICO ==="
echo "Para uso en tiempo real: watch -n 2 'cat /sys/class/drm/card0/device/gpu_busy_percent 2>/dev/null'"
echo "Para monitoreo continuo: radeontop" 