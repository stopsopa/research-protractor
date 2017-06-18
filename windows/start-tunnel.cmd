@echo off
echo "Enabling tunnel"
..\plink.exe -ssh root@%1 -N -C -R 5559:127.0.0.1:5559 -i ..\ssh\id_rsa.ppk
