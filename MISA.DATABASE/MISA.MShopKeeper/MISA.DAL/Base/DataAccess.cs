using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;

namespace MISA.DAL.Base
{
    public class DataAccess : IDisposable
    {
        SqlConnection _sqlConnection;
        SqlCommand _sqlCommand;
        string _connectionString;
        public SqlTransaction _sqlTransaction;


        public SqlCommand SqlCommand
        {
            get { return _sqlCommand; }
        }
        public SqlCommand GetSqlCommand()
        {
            return _sqlCommand;
        }

        public SqlConnection SqlConnection
        {
            get { return _sqlConnection; }
        }

        /// <summary>
        /// Phương thức kết nối đến DB, khởi tạo sql command phục vụ cho câu truy vấn và xác định kiểu thao tác với DB
        /// </summary>
        public DataAccess()
        {
            _connectionString = @"Data Source=database\sql2014;Initial Catalog=MISAMshopkeeper_Web04_Development;Integrated Security=True";
            // Khởi tạo đối tượng SqlConnection để kết nối tới Database:
            _sqlConnection = new SqlConnection(_connectionString);

            // Khởi tạo đối tượng SqlCommand để thao tác với Database:
            _sqlCommand = _sqlConnection.CreateCommand();

            // Khai báo CommandType kiểu thao tác với Database
            _sqlCommand.CommandType = CommandType.StoredProcedure;

            // Mở kết nối:
            _sqlConnection.Open();
        }



        /// <summary>
        /// Đọc dữ liệu
        /// </summary>
        /// <param name="commandText"></param>
        /// <returns></returns>
        public SqlDataReader ExecuteReader(string commandText)
        {
            _sqlCommand.CommandText = commandText;
            return _sqlCommand.ExecuteReader();
        }



        /// <summary>
        /// Đọc giữ liệu dòng đầu tiên cột đầu tiên
        /// </summary>
        /// <param name="commandText"></param>
        /// <returns></returns>
        public object ExecuteScalar(string commandText)
        {
            _sqlCommand.CommandText = commandText;
            return _sqlCommand.ExecuteScalar();
        }



        /// <summary>
        /// Đóng kết nối DB
        /// </summary>
        public void Dispose()
        {
            _sqlConnection.Close();
            //_sqlConnection.Dispose();
            //this.Dispose();
            //_sqlCommand.Dispose();
        }
    }
}

