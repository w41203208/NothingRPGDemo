namespace New.Services
{
    public interface ITestDependencyInjection
    {
        void WriteMessage(string message);
    }
    public class TestDependency : ITestDependencyInjection
    {
        public void WriteMessage(string message)
        {
            Console.WriteLine($"Test.WriteMessage Message: {message}");
        }
    }
}
