#!/bin/bash

# Script de Optimización de Rendimiento Gráfico
# Para ejecutar al inicio o cuando detectes problemas de rendimiento

echo "=== APLICANDO OPTIMIZACIONES DE RENDIMIENTO ==="

# 1. Configurar GPU AMD en modo alto rendimiento
echo "Configurando GPU AMD en modo alto rendimiento..."
echo 'high' | sudo tee /sys/class/drm/card0/device/power_dpm_force_performance_level > /dev/null
echo "✅ GPU configurada en modo alto rendimiento"

# 2. Configurar gobernador CPU para rendimiento
echo "Configurando CPU para rendimiento..."
echo 'performance' | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor > /dev/null
echo "✅ CPU configurada en modo rendimiento"

# 3. Limpiar cachés del sistema
echo "Limpiando cachés del sistema..."
sudo sync
echo 3 | sudo tee /proc/sys/vm/drop_caches > /dev/null
echo "✅ Cachés limpiados"

# 4. Configurar swappiness
echo "Configurando swappiness para mejor rendimiento..."
echo 10 | sudo tee /proc/sys/vm/swappiness > /dev/null
echo "✅ Swappiness configurado a 10"

# 5. Verificar y optimizar compositor KWin
echo "Optimizando compositor KWin..."
qdbus org.kde.KWin /Compositor suspend 2>/dev/null && sleep 1 && qdbus org.kde.KWin /Compositor resume 2>/dev/null
echo "✅ Compositor reiniciado"

# 6. Configurar scheduler I/O
echo "Configurando scheduler I/O..."
echo mq-deadline | sudo tee /sys/block/nvme0n1/queue/scheduler > /dev/null 2>&1
echo "✅ Scheduler I/O optimizado"

echo ""
echo "=== OPTIMIZACIONES APLICADAS ==="
echo "• GPU: Modo alto rendimiento"
echo "• CPU: Modo rendimiento"
echo "• Cachés: Limpiados"
echo "• Swappiness: Reducido a 10"
echo "• Compositor: Reiniciado"
echo "• I/O Scheduler: Optimizado"
echo ""
echo "Para revertir a modo automático GPU: sudo bash -c 'echo auto > /sys/class/drm/card0/device/power_dpm_force_performance_level'"
echo "Para revertir CPU: sudo bash -c 'echo schedutil > /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor'" 