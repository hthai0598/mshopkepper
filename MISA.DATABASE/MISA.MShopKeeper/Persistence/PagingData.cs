using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{

    public class PagingData<T>
    {

        #region Property
        /// <summary>
        /// Danh sách các thực thể
        /// </summary>
        public IEnumerable<T> Entities { get; set; }
        /// <summary>
        /// Số bản ghi
        /// </summary>
        public int TotalRecord { get; set; }
        /// <summary>
        /// Số trang
        /// </summary>
        public int TotalPage { get; set; }
        #endregion

    }
}
