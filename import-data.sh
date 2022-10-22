/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Yw8g64sa -Q "CREATE DATABASE MiniDB;"
for i in {1..10};
do
    /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Yw8g64sa -i ./init.sql
    if [ $? -eq 0 ]
    then
        echo "init.sql completed"
        break
    else
        echo "not ready yet..."
        sleep 1
    fi
done