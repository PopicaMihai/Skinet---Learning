using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("errorhandler/{code}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorHandlerController : BaseApiController
    {
        public IActionResult Error(int code) 
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}