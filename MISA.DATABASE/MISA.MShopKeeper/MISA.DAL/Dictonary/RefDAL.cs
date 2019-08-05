using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;
using Persistence;
using MISA.DAL.Base;
using MISA.DAL.Dictonary;
namespace MISA.DAL
{
    public class RefDAL : BaseDAL<Ref>
    {

        /// <summary>
        /// Lấy ra tất cả các bản ghi trong bảng Ref
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IEnumerable<Ref> Get()
        {
            return GetData("[dbo].[Proc_GetRefsFull]");
        }
        public Ref GetRefByID(object[] id)
        {
            return GetEntity("[dbo].[Proc_GetRefByIDDiaLogShow]", id);
        }

        /// <summary>
        /// Kiểm tra RefNo có trùng
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool CheckRefNo(string id)
        {
            bool result = true;

            using (DataAccess dataAccess = new DataAccess())
            {
                try
                {
                    var command = dataAccess.SqlCommand;
                    command.CommandType = CommandType.StoredProcedure;

                    command.CommandText = "[dbo].[Proc_CheckRefNo]"; // thêm ban;
                    command.Parameters.AddWithValue("@RefNo", id); ;
                    command.ExecuteNonQuery();
                    using (var sqlDataReader = command.ExecuteReader())
                    {
                        if (sqlDataReader.Read())
                        {
                            result = false; /// nếu đọc đc trả về false
                        }
                        else
                        {
                            result = true; /// nếu không đọc đc trả về false
                        }

                    }
                }
                catch (Exception)
                {
                    
                }
               
            }
            return result;
        }

    
        /// <summary>
        /// Tạo Phiếu nhập hàng
        /// </summary>
        /// <param name="invoice"></param>
        /// <returns></returns>
        public bool CreateInvoice(Ref invoice)
        {
            bool result;

            using (DataAccess dataAccess = new DataAccess())
            {
                var command = dataAccess.SqlCommand;
                try
                {
                    result = true;
                    var sqlTransaction = dataAccess.SqlConnection.BeginTransaction(); // Bắt đầu giao dịch
                    command.Transaction = sqlTransaction;// Gán giao dịch cho command

                    // thêm bảng ref
                    command.CommandText = "[dbo].[Proc_CreateRefInvoice]"; // thêm ban
                    command.Parameters.AddWithValue("@RefNo", invoice.RefNo);
                    command.Parameters.AddWithValue("@RefDate", invoice.RefDate);
                    command.Parameters.AddWithValue("@JournalMemo", invoice.JournalMemo);
                    command.Parameters.AddWithValue("@EmployeeID", invoice.EmployeeID);
                    command.Parameters.AddWithValue("@VendorID", invoice.VendorID);
                    command.Parameters.AddWithValue("@ContactName", invoice.ContactName);
                    int recordAdded = command.ExecuteNonQuery(); // Thực hiện câu lệnh và nhận lại số bản ghi xóa thành công
                    Guid refID = Guid.Empty;
                    command.Parameters.Clear();
                    if (recordAdded == 1)
                    {
                        // đọc ra refID
                        command.CommandText = "[dbo].[Proc_GetNewIDRef]";
                        command.Parameters.AddWithValue("@RefNo1", invoice.RefNo);
                        using (var sqlDataReader = command.ExecuteReader())
                        {
                            if (sqlDataReader.Read())
                            {
                                refID = (Guid)sqlDataReader["RefID"];
                            }
                        }
                    }
                    decimal amount = 0;
                    decimal payamount=0;
                    //thêm bảng refdetail
                    foreach (var item in invoice.RefDetails)
                    {

                        command.Parameters.Clear();
                        Guid _inventoryItem = item.InventoryItemID; //Mã inventoryItemID
                        command.CommandText = "[dbo].[Proc_InsertRefDetail_Bill]";
                        command.Parameters.AddWithValue("@RefID", refID);
                        command.Parameters.AddWithValue("@InventoryItemID", item.InventoryItemID);
                        command.Parameters.AddWithValue("@Quantity", item.Quantity);
                        command.Parameters.AddWithValue("@Amount", item.Amount);
                        command.Parameters.AddWithValue("@DiscountRate", item.DiscountRate);
                        command.Parameters.AddWithValue("@DiscountAmount", item.DiscountAmount);
                        command.Parameters.AddWithValue("@VATRate", item.VATRate);
                        command.Parameters.AddWithValue("@VATAmount", item.VATAmount);
                        command.Parameters.AddWithValue("@StockID", item.StockID);
                        command.ExecuteNonQuery();


                        //Lấy ra RefDetailID mới nhất
                        command.Parameters.Clear();
                        command.CommandText = "[dbo].[Proc_GetNewReCord_RefDetails]";
                        command.ExecuteNonQuery();
                        using (var sqlDataReader = command.ExecuteReader())
                        {
                            if (sqlDataReader.Read())
                            {
                                item.RefDetailID = (Guid)sqlDataReader["RefDetailID"];
                            }
                        }

                        string SKU = "";
                        //Lấy SKU code từ bảng inventoryItem 
                        command.Parameters.Clear();
                        command.CommandText = "[dbo].[PROC_GetSkuCode_InventoryItem]";
                        command.Parameters.AddWithValue("@InventoryItem", _inventoryItem);
                        using (var sqlDataReader = command.ExecuteReader())
                        {
                            if (sqlDataReader.Read())
                            {
                                SKU = (string)sqlDataReader["SKUCode"];
                            }
                        }

                        //Update SKU Code vào bảng RefDetail
                        command.Parameters.Clear();
                        command.CommandText = "[dbo].[Proc_UpdateSKUCode_RefDetail]";
                        command.Parameters.AddWithValue("@SKUCode", SKU);
                        command.Parameters.AddWithValue("@Refdetail", item.RefDetailID);
                        command.ExecuteNonQuery();


                        //Update lại tổng tiền trong bảng refdetails
                        item.PayAmount = (item.Amount - item.DiscountAmount + item.VATAmount);
                        payamount = item.PayAmount;
                        command.Parameters.Clear();
                        command.CommandText = "[dbo].[Proc_UpdateRefDetaliPayAmount]";
                        command.Parameters.AddWithValue("@id", item.RefDetailID);
                        command.Parameters.AddWithValue("@PayAmount", payamount);
                        amount = amount + payamount;
                        command.ExecuteNonQuery();
                    }
                    // update tổng tiền ref
                    command.Parameters.Clear();
                    command.CommandText = "[dbo].[Proc_UpdateRefTotalAmount]";
                    command.Parameters.AddWithValue("@RefID", refID);
                    command.Parameters.AddWithValue("@Amount", amount);
                    command.ExecuteNonQuery();
                    try
                    {
                        sqlTransaction.Commit();
                    }
                    catch (Exception)
                    {
                        sqlTransaction.Rollback();
                        throw;
                    }





                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    result = false;
                    throw;
                }
            }
            return result;
        }

        /// <summary>
        /// Lấy giữ liệu của refditails lên dialog show
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Ref GetShow(string id)
        {
            Ref reff = new Ref();
            using (DataAccess dataAccess = new DataAccess())
            {
                var command = dataAccess.SqlCommand;
                try
                {
                    command.CommandText = "[dbo].[Proc_GetRefByIDDiaLogShow]";
                }
                catch (Exception)
                {

                    throw;
                }

            }

            return reff;
        }



        /// <summary>
        /// Xóa 1 thực thể theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteRef(Guid id)
        {
            return DeleteEnity(id, "[dbo].[Proc_DeleteRefById]");
        }

        /// <summary>
        /// Xóa 1 hoặc nhiều Ref theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteRefs(List<Guid> id)
        {
            return DeleteEnitys(id, "[dbo].[Proc_DeleteRefById]");
        }


        /// <summary>
        /// Update bảng Ref
        /// </summary>
        /// <param name="JournalMemo"></param>
        /// <param name="EmployeeID"></param>
        /// <param name="ContactName"></param>
        /// <param name="RefNo"></param>
        /// <returns></returns>
        public bool Update_Ref(string JournalMemo, Guid EmployeeID, string ContactName, string RefNo)
        {
            bool result = true;
           
            try
            {
                result = true;
                using (DataAccess dataAccess = new DataAccess())
                {
                    var command = dataAccess.SqlCommand;
                    command.CommandText = "[dbo].[Proc_Update_Ref]";
                    command.Parameters.AddWithValue("@JournalMemo", JournalMemo);
                    command.Parameters.AddWithValue("@EmployeeID", EmployeeID);
                    command.Parameters.AddWithValue("@ContactName", ContactName);
                    command.Parameters.AddWithValue("@RefNo", RefNo);
                    var sqlTransaction = dataAccess.SqlConnection.BeginTransaction(); // Bắt đầu giao dịch
                    command.Transaction = sqlTransaction;// Gán giao dịch cho command
                    try
                    {
                        sqlTransaction.Commit();
                        command.ExecuteNonQuery();
                    }
                    catch (Exception)
                    {
                        sqlTransaction.Rollback();
                        throw;
                    }
                  
                    
                }
            }
            catch (Exception)
            {
                result = false;

                throw;
            }
            return result;

        }

        /// <summary>
        /// Fillrer giữ liệu khi lấy dữ liệu theo ngày
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="paramValue"></param>
        /// <returns></returns>

        public IEnumerable<Ref> GetEntities(DateTime[] paramValue)
        {
            using (DataAccess dataAccess = new DataAccess())
            {
                var comand = dataAccess.SqlCommand;
                comand.CommandType = CommandType.StoredProcedure;
                comand.CommandText = "Proc_GetRefByDate";

                //Băt đầu Transaction



                //Gán giá trị các tham số đầu vào cho store:


                //lấy các param trong store
                SqlCommandBuilder.DeriveParameters(comand); // *1



                foreach (SqlParameter p in comand.Parameters)
                {
                    var i = comand.Parameters.IndexOf(p);
                    if (i > 0 && i <= paramValue.Length)
                    {
                        p.Value = paramValue[i - 1];
                    }
                    else if (i > paramValue.Length)
                    {
                        break;
                    }
                }
                using (var sqlDataReader = comand.ExecuteReader())
                {
                    while (sqlDataReader.Read())
                    {
                        var entity = Activator.CreateInstance<Ref>();
                        for (int i = 0; i < sqlDataReader.FieldCount; i++)
                        {
                            string fieldName = sqlDataReader.GetName(i);
                            if (entity.GetType().GetProperty(fieldName) != null && sqlDataReader[fieldName] != DBNull.Value)
                            {
                                entity.GetType().GetProperty(fieldName).SetValue(entity, sqlDataReader[fieldName], null);
                            }
                        }
                        yield return entity;
                    }
                }
            }
        }


        /// <summary>
        /// Update lại tổng tiền bảng Ref
        /// </summary>
        /// <param name="id"></param>
        /// <param name="pay"></param>
        /// <returns></returns>
        public bool UpdateRefTotalAmount(Guid id, decimal pay)
        {
            bool result = true;
            using (DataAccess dataAccess = new DataAccess())
            {

                try
                {
                    result = true;
                    var command = dataAccess.SqlCommand;
                    command.CommandText = "Proc_UpdateRefPayAmount";
                    command.Parameters.AddWithValue("@total", pay);
                    command.Parameters.AddWithValue("@id", id);
                    command.ExecuteNonQuery();

                }
                catch (Exception)
                {
                    result = false;
                    throw;
                }
               
            }
            return result;
        }




    }
}
