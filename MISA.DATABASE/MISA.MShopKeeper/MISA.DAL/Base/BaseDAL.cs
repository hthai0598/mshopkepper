using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Reflection;
using Persistence;

namespace MISA.DAL.Base
{
    public class BaseDAL<T>
    {
        /// <summary>
        /// Lấy ra 1 thực thể by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // <summary>
        /// Lấy dữ liệu qua đối số
        /// Created By : NVSON(24/06/2019)
        /// </summary>
        /// <param name="storeName">Tên Procedure</param>
        /// <param name="value">Mảng các tham số </param>
        /// <returns></returns>
        public T GetEntity(string storeName, object[] value)
        {

            var entity = Activator.CreateInstance<T>();
            try
            {
                using (DataAccess dataAccess = new DataAccess())
                {
                    var cmd = dataAccess.GetSqlCommand();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = storeName;


                    //Gán giá trị các tham số đầu vào cho store:
                    SqlCommandBuilder.DeriveParameters(cmd);

                    foreach (SqlParameter p in cmd.Parameters)
                    {
                        var i = cmd.Parameters.IndexOf(p);
                        if (i > 0 && i <= value.Length)
                        {
                            p.Value = value[i - 1];
                        }
                        else if (i > value.Length) break;
                    }

                    SqlDataReader sqlDataReader = cmd.ExecuteReader();
                    while (sqlDataReader.Read())
                    {

                        for (int i = 0; i < sqlDataReader.FieldCount; i++)
                        {
                            var propertyName = sqlDataReader.GetName(i);
                            var propertyValue = sqlDataReader.GetValue(i);
                            var propertyInfor = entity.GetType().GetProperty(propertyName);
                            if (propertyInfor != null && propertyValue != DBNull.Value)
                            {
                                propertyInfor.SetValue(entity, propertyValue);
                            }
                        }
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return entity;
        }


        /// <summary>
        /// Lấy ra tất cả dữ liệu trong 1 bảng
        /// </summary>
        /// <param name="storeName"></param>
        /// <returns></returns>
        public List<T> GetData(string storeName)
        {
            var entities = new List<T>();
            using (DataAccess dataAccess = new DataAccess())
            {
                // Khởi tạo đối tượng SqlDataReader hứng dữ liệu trả về:
                SqlDataReader sqlDataReader = dataAccess.ExecuteReader(storeName);
                while (sqlDataReader.Read())
                {
                    var entity = Activator.CreateInstance<T>();
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        // Lấy ra tên propertyName dựa vào tên cột của field hiện tại:
                        var propertyName = sqlDataReader.GetName(i);
                        // Lấy ra giá trị của field hiện tại:
                        var propertyValue = sqlDataReader.GetValue(i);
                        // Gán Value cho Property tương ứng:
                        var propertyInfo = entity.GetType().GetProperty(propertyName);
                        if (propertyInfo != null && propertyValue != DBNull.Value)
                        {
                            propertyInfo.SetValue(entity, propertyValue);

                        }
                    }
                    entities.Add(entity);

                }
                dataAccess.Dispose();

            }

            return entities;
        }

        /// <summary>
        /// phương thức chung lấy ra 1 list A khi gửi vào 1 ID trùng trong list A
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="paramValue"></param>
        /// <returns></returns>
        public virtual IEnumerable<T> GetEntities(string storeName, object[] paramValue)
        {

            using (DataAccess dataAccess = new DataAccess())
            {
                var comand = dataAccess.SqlCommand;
                comand.CommandType = CommandType.StoredProcedure;
                comand.CommandText = storeName;

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
                        var entity = Activator.CreateInstance<T>();
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
        /// Lấy ra ID cuối cùng + 1 trong bảng ref
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="tableName"></param>
        /// <param name="columnName"></param>
        /// <param name="prefix"></param>
        /// <returns></returns>
        public string GetLastID(string storeName, string tableName, string columnName, string prefix)
        {
            string id = "";

            using (DataAccess dataAccess = new DataAccess())
            {
                var command = dataAccess.SqlCommand;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = storeName;
                command.Parameters.AddWithValue("@TableName", tableName);
                command.Parameters.AddWithValue("@ColumnName", columnName);
                command.Parameters.AddWithValue("@Prefix", prefix);

                using (var sqlDataReader = command.ExecuteReader())
                {
                    if (sqlDataReader.Read())
                    {
                        id = (string)sqlDataReader[0];
                    }

                }
            }

            return id;
        }


        /// <summary>
        /// Xóa 1 thực thể, trả về số bản ghi xóa thành công
        /// </summary>
        /// <param name="guidID">ID thực thể</param>
        /// <returns>int</returns>
        /// Created date: 03/07/2019
        /// Author: nhthai
        public bool DeleteEnity(Guid guidID, string storeName)
        {
            bool recordDeleted = true;

            using (DataAccess dataAccess = new DataAccess())
            {
                var command = dataAccess.SqlCommand;
                command.CommandText = storeName;
                command.Parameters.AddWithValue("@RefID", guidID);
                var sqlTransaction = dataAccess.SqlConnection.BeginTransaction(); // Bắt đầu giao dịch
                command.Transaction = sqlTransaction;// Gán giao dịch cho command
                try
                {
                    recordDeleted = true;
                    command.ExecuteNonQuery(); // Thực hiện câu lệnh và nhận lại số bản ghi xóa thành công
                    sqlTransaction.Commit(); // Xác nhận giao dịch
                }
                catch (Exception ex)
                {
                    recordDeleted = false;
                    sqlTransaction.Rollback(); // Khôi phục lại giao dịch 
                    Console.WriteLine(ex.Message);
                }
            }
            return recordDeleted;
        }


        /// <summary>
        /// Xóa 1 danh sách thực thể
        /// </summary>
        /// <param name="id"></param>
        /// <param name="storeName"></param>
        /// <returns></returns>
        public bool DeleteEnitys(List<Guid> id, string storeName)
        {
            bool recordDeleted = true;
            using (DataAccess dataAccess = new DataAccess())
            {
                //id = new List<Guid>();
                var command = dataAccess.SqlCommand;
                command.CommandText = storeName;
                var sqlTransaction = dataAccess.SqlConnection.BeginTransaction(); // Bắt đầu giao dịch
                command.Transaction = sqlTransaction;// Gán giao dịch cho command
                try
                {
                    foreach (var item in id)
                    {
                        command.Parameters.Clear();
                        command.CommandText = storeName;
                        command.Parameters.AddWithValue("@RefID", item);
                        command.ExecuteNonQuery(); // Thực hiện câu lệnh và nhận lại số bản ghi xóa thành công
                    }
                    recordDeleted = true;
                    sqlTransaction.Commit(); // Xác nhận giao dịch
                }
                catch (Exception ex)
                {
                    recordDeleted = false;
                    sqlTransaction.Rollback(); // Khôi phục lại giao dịch 
                    Console.WriteLine(ex.Message);
                }
            }

            return recordDeleted;

        }




        /// <summary>
        /// 
        /// </summary>
        /// <param name="selectString">Các trường cần lấy, lấy hết = *</param>
        /// <param name="conditionString">Điều kiện</param>
        /// <param name="pageSize">Số bản ghi cần lấy</param>
        /// <param name="pageNumber">Trang cần lấy</param>
        /// <param name="orderBy">Sắp xếp theo</param>
        /// <returns></returns>
        public async Task<Result> GetEntiesPaging(string selectString, string conditionString, int pageSize, int pageNumber, string orderBy)
        {
            var result = new Result();
            var entity = Activator.CreateInstance<T>();
            await Task.Run(() =>
            {
                try
                {
                    using (var dataAccess = new DataAccess())
                    {
                        var sqlComand = dataAccess.SqlCommand;
                        sqlComand.CommandText = "[dbo].[Proc_PagingAndFilter_Ref]";
                        
                            SqlParameter totalRecordParameter = new SqlParameter("@TotalRecord", SqlDbType.Int),
                                totalPageParameter = new SqlParameter("@TotalPage", SqlDbType.Int);

                            //xác định đầu ra là output, mặc định là input
                            totalRecordParameter.Direction = totalPageParameter.Direction = ParameterDirection.Output;


                            sqlComand.Parameters.AddWithValue("@Select", selectString);
                            sqlComand.Parameters.AddWithValue("@Condition", conditionString);
                            sqlComand.Parameters.AddWithValue("@PageSize", pageSize);
                            sqlComand.Parameters.AddWithValue("@PageNumber", pageNumber);
                            sqlComand.Parameters.AddWithValue("@OrderBy", orderBy);
                            sqlComand.Parameters.Add(totalRecordParameter);
                            sqlComand.Parameters.Add(totalPageParameter);

                            using (var dataReader = sqlComand.ExecuteReader())
                            {
                                int fieldCount = dataReader.FieldCount;
                                List<T> entities = new List<T>();

                                while (dataReader.Read())
                                {
                                    entity = Activator.CreateInstance<T>();
                                    for (int i = 0; i < fieldCount; i++)
                                    {
                                        string fieldName = dataReader.GetName(i);
                                        var fieldProperty = entity.GetType().GetProperty(fieldName);

                                        if (fieldProperty != null && dataReader[i] != DBNull.Value)
                                        {
                                            fieldProperty.SetValue(entity, dataReader[i]);
                                        }
                                    }
                                    entities.Add(entity);
                                }

                            dataReader.Close();
                            var pagingData = new PagingData<T>();
                                pagingData.Entities = entities;
                                pagingData.TotalRecord = (int)totalRecordParameter.Value;
                                pagingData.TotalPage = (int)totalPageParameter.Value;
                                result.Data = pagingData;
                                result.Success = true;
                            }
                        
                    }
                }
                catch (Exception ex)
                {
                    result.Success = false;
                  
                }
            });

            return result;
        }





        /// <summary>
        /// phương thức ngắt kết nối
        /// </summary>
        public void Dispose()
        {

        }
    }
}
