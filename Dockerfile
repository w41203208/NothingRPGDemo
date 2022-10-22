#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
EXPOSE 80
EXPOSE 443
WORKDIR /src
COPY ["New.csproj", "."]
RUN dotnet restore "./New.csproj"
COPY . .
WORKDIR "/src/."
RUN echo "This is build stage"
RUN dotnet build "New.csproj" -c Release -o /app/build

FROM build AS publish
RUN echo "This is publish stage"
RUN dotnet publish "New.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
RUN echo "This is final stage"
ENTRYPOINT ["dotnet", "New.dll"]