# RPG-DEMO

Simple RPG-DEMO on web app.

## Use

```
.Net Core + React + Microsoft SQL Server
```

## Frontend - React

Learning use Redux to store data.

-

## Backend - C# ASp.Net Core

-

## Database - MSSQL

### Table Reference：https://github.com/jgoodman/MySQL-RPG-Schema

- Attribute
- Character
- CharacterAttribute
- CharacterBag
- CharacterEquipment
- EquipmentSlot
- Item
- ItemType
- Shop
- User
- UserCharacter

## Docker Deploy

### 在外面執行 docker 指令產生環境運行

Using following under command at local folder to excute deployment.

> ## init 專案
>
> docker compose up -d
>
> docker exec -it -d game-db bash import-data.sh
>
> ## 重建專案
>
> docker compose up -d

- 待釐清：資料庫連線的 ConnectionString 是否跟 docker-compose 前面設定的 service name 有關。

## 使用 visual studio 執行 docker-compose 來進行部署

> ## init 專案
>
> 1. 要先執行 Add-Migration init ( 讓 migration 檔案產生
>
> 2. 直接啟動偵錯 docker-compose 


### 問題： ( 都已解決 )

#### 使用偵錯啟動 dockerfile or docker-compose

- Q： dockerfile 裡面有 stage 只能執行其中一個，就算在 docker-compose 設定 build - target 也不行，visual studio 的專案檔有 MSBuild 可以設定選擇哪一個 stage 執行。
- A： asp.net and react template need to add 以下設定，就會跳脫只執行一個 stage 的狀況。但 asp.net and blazer 專案不用。

> ```
> In [your 專案 name].csproj - dockerfile setting
> <ContainerDevelopmentMode>Regular</ContainerDevelopmentMode>
> In docker-compose.dcproj - docker-compose setting
> <DockerDevelopmentMode>Regular</DockerDevelopmentMode>
> ```

- Q：使用偵錯啟動 docker-compose mssql 會啟動不成功，但是在外面執行指令卻又能成功。
- A：已解決

## Will do

- 整理 code 看哪裡需要改進
- expand other function like item has multiple attribute and so on...
- use Firebase to login or not.
