using Microsoft.EntityFrameworkCore;
using New.Context;
using New.Services;

var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// 以下是DI waht you want services
// Add services to the container.
builder.Services.AddControllers();
// Add EF6 ORM service
builder.Services.AddDbContext<MiniDBContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("MiniProjectDBConnection"));
        Console.WriteLine("DB is connecting!");
    }
);
// Add Custom service
builder.Services.AddScoped<ITestDependencyInjection, TestDependency>();
//builder.Services.AddHsts(options =>
//{
//    options.Preload = true;
//    options.IncludeSubDomains = true;
//    options.MaxAge = TimeSpan.FromDays(60);
//    options.ExcludedHosts.Add("< your domain name >");
//});
///// Enable CORS
builder.Services.AddCors(o =>
{
    o.AddPolicy(name: myAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:5500").AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();
using (var serviceScope = app.Services.CreateScope())
{
    var services = serviceScope.ServiceProvider;

    var dbcontext = services.GetRequiredService<MiniDBContext>();
    dbcontext.Database.Migrate();
}
// 以下為Middlewares
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
if (app.Environment.IsDevelopment())
{
    // 開發時使用的錯誤顯示
    DeveloperExceptionPageOptions developerExceptionPageOptions = new DeveloperExceptionPageOptions
    {
        SourceCodeLineCount = 4 //顯示的行數為錯誤那行的前後4行
    };
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(myAllowSpecificOrigins);
app.UseAuthorization();
app.Use(async (context, next) =>
{
    Console.WriteLine(context.Request.Headers.Host);
    await next.Invoke();
});
// Add a middleware to display author's name at response headers.
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("Developed-By", "MingZhe");
    await next.Invoke();
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
//app.Map("/api/User", HandleMapTest1);

app.Run();

//static void HandleMapTest1(IApplicationBuilder app)
//{
//    app.Run(async (context) =>
//    {
//        await context.Response.WriteAsync("Map Test 1");
//    });
//}
