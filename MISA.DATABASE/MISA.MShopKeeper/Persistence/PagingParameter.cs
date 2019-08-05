using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class PagingParameter
    {
        #region Property
        /// <summary>
        /// Danh sách cột cần lấy, lấy hết để mảng rỗng
        /// </summary>
        public IEnumerable<string> Columns { get; set; }

        /// <summary>
        /// Danh sách Filter
        /// </summary>
        public IEnumerable<Filter> Filters { get; set; }

        /// <summary>
        /// Số bản ghi
        /// </summary>
        public int RecordCount { get; set; }

        /// <summary>
        /// Số trang
        /// </summary>
        public int Page { get; set; }

        /// <summary>
        /// Sắp xếp theo
        /// </summary>
        public string OrderBy { get; set; }
        #endregion
    }
}
