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

namespace MISA.DAL.Dictonary
{
    public class RefDetailDAL : BaseDAL<RefDetail>
    {

        /// <summary>
        /// Lấy ra 1 list refDetails
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="paramValue"></param>
        /// <returns></returns>
        public IEnumerable<RefDetail> GetRefDetail(string storeName, object[] paramValue)
        {
            return GetEntities(storeName, paramValue);
        }



        /// <summary>
        /// Lấy ra danh sách refDetails by refID trong DB với RefID từ client gửi xuống
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="paramValue"></param>
        /// <returns>Trả về 1 list refdetails</returns>
        public List<Guid> GetRefDetailByIDRef(Guid refid)
        {
            List<Guid> list = new List<Guid>();
            using (DataAccess dataAccess = new DataAccess())
            {
                decimal total = 0;
                var command = dataAccess.SqlCommand;
                command.CommandText = "[dbo].[Proc_GetRefDetailsStockByRefId]";
                command.Parameters.AddWithValue("@RefID", refid);
                command.ExecuteNonQuery();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var refDetailID = (Guid)reader["RefDetailID"];
                        list.Add(refDetailID);
                    }
                }
            }
            return list;
        }
        

        /// <summary>
        /// Kiểm tra refdetail rơi vào trường hợp nào r tiến hành thêm/sửa/xóa
        /// </summary>
        /// <param name="r"></param>
        /// <returns></returns>
        public bool CheckRefDetail(Ref r)
        {
        
            bool result = true;
            List<Guid> listDelete = new List<Guid>();
          
            RefDAL refDAL = new RefDAL();
            try
            {

                // nếu không có refdetail nào đc gửi lên => user xóa hết refdetail, ta thực hiện hàm xóa hết refdetails by refID
                if (r.RefDetails.Count <=0)
                {
                    DeleteAllRefDetail(r.RefID);
                    refDAL.UpdateRefTotalAmount(r.RefID, 0);

                }
                else
                {
                    var list = GetRefDetailByIDRef(r.RefID);   //Lấy ra những refdetail by refID trong DB
                    var count = list.Count;
            
                    if (count > 0)
                    {
                        foreach (var refID_DB in list.ToList()) // list refdetailID DB
                        {  //A D Z B

                            foreach (var ref_CL in r.RefDetails.ToList()) // list refdetailID CL
                            {
                                //A B
                                //Nếu có refdetail vẫn tồn tại, check xem có thay đổi gì không.
                                if (refID_DB == ref_CL.RefDetailID)
                                {
                                  
                                    UpdateRefDetail(ref_CL.RefDetailID, ref_CL.InventoryItemID, ref_CL.Quantity, ref_CL.Amount, ref_CL.DiscountRate, ref_CL.DiscountAmount, ref_CL.VATRate, ref_CL.VATAmount, ref_CL.StockID);
                                    var payamount = ReaderPayAmountRefDetail(r.RefID);
                                    refDAL.UpdateRefTotalAmount(r.RefID, payamount);
                                    

                                    int indexCL = r.RefDetails.IndexOf(ref_CL);
                                    r.RefDetails.RemoveAt(indexCL);
                                    int indexDB = list.IndexOf(refID_DB);
                                    list.RemoveAt(indexDB);
                                    break;

                                }
                            
                            }
                        }
                        //Nếu list trong DB còn, ta xóa những refdetai k trùng trong DB
                        if (count > 0)
                        {
                            foreach (var item in list)
                            {
                                DeleteRefDetail(item);
                                
                            }
                        }
                        //Nếu list trong CL còn, ta thực hiện thêm những refdetail người dùng mới thêm vào
                        if (r.RefDetails.Count > 0)
                        {
                            foreach (var CL in r.RefDetails.ToList())
                            {
                                InsertRefDetail(r.RefID, CL.InventoryItemID, CL.Quantity, CL.Amount, CL.DiscountRate, CL.DiscountAmount, CL.VATRate, CL.VATAmount, CL.StockID);
                                var payamount = ReaderPayAmountRefDetail(r.RefID);
                                refDAL.UpdateRefTotalAmount(r.RefID, payamount);

                            }
                        }
                        
                    }
                    else
                    {
                        foreach (var CL in r.RefDetails)
                        {
                            InsertRefDetail(r.RefID, CL.InventoryItemID, CL.Quantity, CL.Amount,CL.DiscountRate, CL.DiscountAmount, CL.VATRate, CL.VATAmount, CL.StockID);
                            var payamount = ReaderPayAmountRefDetail(r.RefID);
                            refDAL.UpdateRefTotalAmount(r.RefID, payamount);

                        }
                    }
                    result = true;
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
        /// Xóa refdetail
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteAllRefDetail(Guid id)
        {
            bool result = true;
            using (DataAccess dataAccess = new DataAccess())
            {
                var command = dataAccess.SqlCommand;
                command.CommandText = "[dbo].[Proc_DeleteAllRefDetail]";
                command.Parameters.AddWithValue("@id", id);
                var sqlTransaction = dataAccess.SqlConnection.BeginTransaction(); // Bắt đầu giao dịch
                command.Transaction = sqlTransaction;// Gán giao dịch cho command
                try
                {
                    result = true;
                    command.ExecuteNonQuery();
                    sqlTransaction.Commit();
                }
                catch (Exception)
                {
                    result = false;
                    sqlTransaction.Rollback();
                    throw;
                }
            }
            return result;
        }


        /// <summary>
        /// Thêm Refdetail
        /// </summary>
        /// <param name="RefID"></param>
        /// <param name="InventoryItemID"></param>
        /// <param name="Quantity"></param>
        /// <param name="Amount"></param>
        /// <param name="DiscountRate"></param>
        /// <param name="DiscountAmount"></param>
        /// <param name="VATRate"></param>
        /// <param name="VATAmount"></param>
        /// <param name="StockID"></param>
        /// <returns></returns>
        public bool InsertRefDetail(Guid RefID, Guid InventoryItemID, int Quantity, decimal Amount, decimal DiscountRate, decimal DiscountAmount, decimal VATRate, decimal VATAmount , Guid StockID)
        {
            bool ressult = true;
            Guid RefDetailID = new Guid();


            using (DataAccess dataAccess = new DataAccess())
            {
                var command = dataAccess.SqlCommand;
                var sqlTransaction = dataAccess.SqlConnection.BeginTransaction(); // Bắt đầu giao dịch
                command.Transaction = sqlTransaction;// Gán giao dịch cho command
                command.Parameters.Clear();

                Guid _inventoryItem =InventoryItemID; //Mã inventoryItemID
                command.CommandText = "[dbo].[Proc_InsertRefDetail_Bill]";
                command.Parameters.AddWithValue("@RefID", RefID);
                command.Parameters.AddWithValue("@InventoryItemID",InventoryItemID);
                command.Parameters.AddWithValue("@Quantity",Quantity);
                command.Parameters.AddWithValue("@Amount",Amount);
                command.Parameters.AddWithValue("@DiscountRate",DiscountRate);
                command.Parameters.AddWithValue("@DiscountAmount",DiscountAmount);
                command.Parameters.AddWithValue("@VATRate",VATRate);
                command.Parameters.AddWithValue("@VATAmount",VATAmount);
                command.Parameters.AddWithValue("@StockID",StockID);
                command.ExecuteNonQuery();

                ////Lấy ra RefDetailID mới nhất
                command.Parameters.Clear();
                command.CommandText = "[dbo].[Proc_GetNewReCord_RefDetails]";
                command.ExecuteNonQuery();
                using (var sqlDataReader = command.ExecuteReader())
                {
                    if (sqlDataReader.Read())
                    {
                     
                       RefDetailID= (Guid)sqlDataReader["RefDetailID"];
                        
                    }
                }

                string SKU = "";
                ////Lấy SKU code từ bảng inventoryItem 
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
                command.Parameters.AddWithValue("@Refdetail", RefDetailID);
                command.ExecuteNonQuery();



                //Update lại tổng tiền trong bảng refdetails
              var payamount = (Amount - DiscountAmount + VATAmount);
           
                command.Parameters.Clear();
                command.CommandText = "[dbo].[Proc_UpdateRefDetaliPayAmount]";
                command.Parameters.AddWithValue("@id", RefDetailID);
                command.Parameters.AddWithValue("@PayAmount", payamount);
                
                command.ExecuteNonQuery();
                try
                {
                    ressult = true;
                    sqlTransaction.Commit();
                }
                catch (Exception)
                {
                    ressult = false;
                    sqlTransaction.Rollback();
                    throw;
                }
            }

            return ressult;
        }
           

        /// <summary>
        /// Update bảng RefDetail by id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>

        public bool UpdateRefDetail(Guid Id, Guid InventoryItemID, int Quantity, decimal Amount, decimal DiscountRate, decimal DiscountAmount, decimal VATRate, decimal VATAmount, Guid StockID)
        {
            bool result = true;

            using (DataAccess dataAccess = new DataAccess())
            {
                var command = dataAccess.SqlCommand;
                var sqlTransaction = dataAccess.SqlConnection.BeginTransaction(); // Bắt đầu giao dịch
                command.Transaction = sqlTransaction;// Gán giao dịch cho command
                command.CommandText = "[dbo].[Proc_UpdateRefDetai_1]";
                command.Parameters.Clear();
                command.Parameters.AddWithValue("@RefDetailID", Id);
                command.Parameters.AddWithValue("@InventoryItemID", InventoryItemID);
                command.Parameters.AddWithValue("@Quantity", Quantity);
                command.Parameters.AddWithValue("@Amount", Amount);
                command.Parameters.AddWithValue("@DiscountRate", DiscountRate);
                command.Parameters.AddWithValue("@DiscountAmount", DiscountAmount);
                command.Parameters.AddWithValue("@VATRate", VATRate);
                command.Parameters.AddWithValue("@VATAmount", VATAmount);
                command.Parameters.AddWithValue("@StockID", StockID);
                command.ExecuteNonQuery();

                string SKU = "";
                //Lấy SKU code từ bảng inventoryItem 
                command.Parameters.Clear();
                command.CommandText = "[dbo].[PROC_GetSkuCode_InventoryItem]";
                command.Parameters.AddWithValue("@InventoryItem", InventoryItemID);
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
                command.Parameters.AddWithValue("@Refdetail", Id);
                command.ExecuteNonQuery();

                //Update lại tổng tiền trong bảng refdetails
                var PayAmount = (Amount - DiscountAmount + VATAmount);

                command.Parameters.Clear();
                command.CommandText = "[dbo].[Proc_UpdateRefDetaliPayAmount]";
                command.Parameters.AddWithValue("@id", Id);
                command.Parameters.AddWithValue("@PayAmount", PayAmount);
                
                command.ExecuteNonQuery();
                try
                {
                    result = true;
                    sqlTransaction.Commit();
                }
                catch (Exception)
                {
                    result = false;
                    sqlTransaction.Rollback();
                    throw;
                }
            }
            return result;
        }


        /// <summary>
        /// /Xóa 1 RefDetail bằng ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteRefDetail(Guid id)
        {
            bool result = true;


            using (DataAccess dataAccess = new DataAccess())
            {
                var command = dataAccess.SqlCommand;
                command.CommandText = "[dbo].[Proc_RefDetailById]";
                command.Parameters.AddWithValue("@ID", id);
                var sqlTransaction = dataAccess.SqlConnection.BeginTransaction(); // Bắt đầu giao dịch
                command.Transaction = sqlTransaction;// Gán giao dịch cho command
                try
                {
                    result = true;
                    command.ExecuteNonQuery();
                    sqlTransaction.Commit();
                }
                catch (Exception)
                {
                    result = false;
                    sqlTransaction.Rollback();
                    throw;
                }
            }
            return result;
        }

       /// <summary>
       /// tỉnh tổng tiền tất cả bảng refdetail
       /// </summary>
       /// <param name="guid"></param>
       /// <returns></returns>
        public decimal ReaderPayAmountRefDetail(Guid guid)
        {
            decimal pay = 0;
            decimal amount = 0;
            using (DataAccess dataAccess = new DataAccess())
            {
                var commond = dataAccess.SqlCommand;
                commond.CommandText = "Proc_ReaderPayAmountRef";
                commond.Parameters.AddWithValue("@id", guid);
                using (SqlDataReader reader = commond.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        amount = (decimal)reader["PayAmount"];
                        pay = pay + amount;
                    }
                }
            }
            return pay;
        }














        


    }
}
