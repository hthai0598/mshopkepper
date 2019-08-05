using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MISA.DemoShop.Models;
using MISA.BL.Dictonary;
using Persistence;

namespace MISA.DemoShop.Controllers
{
    [RoutePrefix("InventoryItems")]
    public class ItemDetalisController : ApiController
    {
        /// <summary>
        /// Lấy ra dữ liệu của inventoryintem
        /// </summary>
        /// <returns>
        /// Create by Nhthai(4/05/2019)
        /// </returns>
        [HttpGet]
        [Route("inventoryItem")]
        public Result Get()
        {
            var result = new Result();
            try
            {
                var item = new InvetoryItemBL();
                result.Data = item.GetDataInventoryItem();
                result.Success = true;
            }
            catch (Exception)
            {
                result.Success = true;
                throw;
            }
            return result;
        }

        /// <summary>
        /// Lấy ra dữ liệu chi tiết của inventoryitem khi trùng với refID  
        /// </summary>
        /// <returns>
        /// Create by Nhthai(4/05/2019)
        /// </returns>
        // GET: api/ItemDetalis/5
        [HttpGet]
        [Route("itemdetails/{id}")]
        public Result Get(string id)
        {
            var result = new Result();
            try
            {
                var item = new RefDetailBL();
                List<string> ids = new List<string>();
                ids.Add(id);
                result.Data = item.GetDataRefDetail(ids.ToArray());
                result.Success = true;
            }
            catch (Exception)
            {
                result.Success = false;
                throw;
            }
            return result;

        }


        /// <summary>
        /// Lấy ra dữ liệu item bằng 1 id
        /// </summary>
        /// <returns>
        /// Create by Nhthai(4/05/2019)
        /// </returns>
        [HttpGet]
        [Route("item/{id}")]
        public Result GetItem(string id)
        {
            var result = new Result();
            try
            {
                var item = new InvetoryItemBL();
                List<string> ids = new List<string>();
                ids.Add(id);
                result.Data = item.GetDataRefDetail(ids.ToArray());
                result.Success = true;
            }
            catch (Exception)
            {
                result.Success = false;

                throw;
            }
            return result;
        }



        // POST: api/ItemDetalis
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ItemDetalis/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ItemDetalis/5
        public void Delete(int id)
        {
        }

        public class InvetoryItem
        {
        }
    }
}
