using alias.Server.Hubs;
using alias.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddSignalR();

builder.Services.AddHostedService<PackLoaderService>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(builder => builder
     .AllowAnyOrigin()
     .AllowAnyMethod()
     .AllowAnyHeader());

app.UseHttpsRedirection();

app.MapControllers();

app.UseRouting();

app.UseAuthorization();

app.MapHub<RoomHub>("/room");

app.Run();
