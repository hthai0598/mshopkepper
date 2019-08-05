
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MISA.DemoShop.Models;
using Persistence;
using MISA.BL.Dictonary;

namespace MISA.DemoShop.Controllers
{
    public class ObjectDetailController : ApiController
    {

        /// <summary>
        /// Lấy ra dữ liệu của class ObjectDetails
        /// </summary>
        /// <returns>
        /// Create by Nhthai(4/05/2019)
        /// </returns>
        // GET: api/ObjectDetail
        public Result Get()
        {
            var result = new Result();
            try
            {
                VendorBL vendorBL = new VendorBL();
                 result.Data = vendorBL.GetDataVendor();
                result.Success = true;
                
            }
            catch (Exception)
            {
                result.Success = false;
                throw;
            }
            return result;
        }

        // GET: api/ObjectDetail/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ObjectDetail
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ObjectDetail/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ObjectDetail/5
        public void Delete(int id)
        {
        }
    }
}
