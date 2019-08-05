using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MISA.DemoShop.Models;
using Persistence;
using MISA.BL.Dictonary;
using MISA.BL.Base;
using System.Threading.Tasks;

namespace MISA.DemoShop.Controllers
{


    [RoutePrefix("Refs")]
    public class ManagerShopController : ApiController
    {

        /// <summary>
        /// Lấy ra tất cả dữ liệu của bảng Ref
        /// </summary>
        /// <returns>
        /// Create by Nhthai(4/05/2019)
        /// </returns>

        [HttpGet]
        [Route("")]
        public Result Get()
        {
            var result = new Result();
            try
            {
                RefBL refBL = new RefBL();
                 result.Data = refBL.GetDataRef();
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
        /// Lấy ra tất cả dữ liệu của bảng Employee
        /// </summary>
        /// <returns>
        /// Create by Nhthai(4/05/2019)
        /// </returns>

        [HttpGet]
        [Route("Employee")]
        public Result GetEmployee()
        {
            var result = new Result();
            try
            {
                EmployeeBL emBL = new EmployeeBL();
                result.Data = emBL.GetDataEmpolyee();
                result.Success = true;
            }
            catch (Exception)
            {
                result.Success = false;
                throw;
            }
            return result;
        }

        [HttpGet]
        [Route("Stock")]
        public Result GetStock()
        {
            var result = new Result();
            try
            {
                StockBL emBL = new StockBL();
                result.Data = emBL.GetDataStock();
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
        /// lấy dữ liệu của 1 ọn thông qua ID
        /// </summary>
        /// <returns></returns>
        // GET: api/ManagerShop/5
        [HttpGet]
        [Route("managerShop/{id}")]
        public Result Get(string id)
        {
            var result = new Result();
            try
            {
                
                RefBL refBL = new RefBL();
                var Ref = new Ref();
                List<string> ids = new List<string>();
                ids.Add(id);
                //return refBL.GetRefByID(ids.ToArray());
                result.Data = refBL.GetRefByID(ids.ToArray());
                result.Success = true;
            }
            catch (Exception)
            {
                result.Success = false;
                throw;
            }
            return result;
        }

        ///// <summary>
        ///// lấy dữ liệu của 1 ọn thông qua ID
        ///// </summary>
        ///// <returns></returns>
        //// GET: api/ManagerShop/5
        [HttpPost]
        [Route("listrefbyDate")]
        public Result GetRefByDate([FromBody]List<DateTime> id)
        {
            var result = new Result();
            try
            {
                RefBL refBL = new RefBL();
                var Ref = new Ref();
                result.Data= refBL.GetRefByDate(id.ToArray());
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
        /// lấy ID cuối cùng + 1 trong DB
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("getlastid")]
        public Result GetLast()
        {
            var result = new Result();
            try
            {
                var baseBL = new BaseBL<Ref>();

                result.Data = baseBL.GetLastID("[dbo].[Proc_GetNewCode]", "Ref", "RefNo", "NK");
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
        /// Hàm xử lý thêm mới phiếu nhập hàng
        /// </summary>
        /// <returns>
        /// Create by Nhthai(4/05/2019)
        /// </returns>
        // POST: api/ManagerShop
        [HttpPost]
        [Route("CreateInvoice")]
        public bool Post([FromBody]Ref r)
        {
            try
            {
                RefBL refBL = new RefBL();
                var re = new Ref();

                var res = new RefDetail();
                if (refBL.CheckRefNo(r.RefNo) == true)
                {
                    refBL.CreateInvoice(r);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {

                throw;
            }

        }

        /// <summary>
        /// Update lại bảng refdetails
        /// </summary>
        /// <param name="r"></param>
        [HttpPut]
        [Route("UpdateInvoice")]
        public Result Update([FromBody] Ref r)
        {
            var result = new Result();
            try
            {
                RefBL refBL = new RefBL();
                RefDetailBL detailBL = new RefDetailBL();
                var check = refBL.UpdateRef(r.JournalMemo, r.EmployeeID, r.ContactName, r.RefNo);
                if (check == true)
                {
                    detailBL.CheckRefDetail(r);
                }
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
        /// Update Ref
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>

        // PUT: api/ManagerShop/5
        public void Put(int id, [FromBody]string value)
        {
        }

        ///// <summary>
        ///// Xóa Ref theo RefID
        ///// </summary>
        ///// <returns>
        ///// Create by Nhthai(4/05/2019)
        ///// </returns>
        //// DELETE: api/ManagerShop/5
        //[HttpDelete]
        //[Route("deleteby/{id}")]
        //public void Delete(string id)
        //{
        //    try
        //    {
        //        RefBL refBL = new RefBL();
        //        refBL.DeleteEntity(Guid.Parse(id));
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}





        /// <summary>
        /// Xóa nhiều Ref theo RefID
        /// </summary>
        /// <returns>
        /// Create by Nhthai(4/05/2019)
        /// </returns>
        // DELETE: api/ManagerShop/5
        [HttpDelete]
        [Route("deletesby")]
        public Result Deletes([FromBody] List<Guid> id)
        {
            var result = new Result();
            try
            {

                RefBL refBL = new RefBL();
                result.Data= refBL.DeleteEntitys(id);
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
        /// Filter và phân trang
        /// </summary>
        /// <param name="pagingParameter"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("FilterAndPaging")]
        public async Task<Result> Get(PagingParameter pagingParameter)
        {
            var result = new Result();

            try
            {
                var baseBL = new BaseBL<Ref>();

                result = await baseBL.GetEntitiesPaging(pagingParameter);
                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
            }

            return result;
        }





    }
}
