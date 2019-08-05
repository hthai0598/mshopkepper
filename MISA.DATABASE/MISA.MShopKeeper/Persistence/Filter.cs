using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    /// <summary>
    /// Filter dữ liệu
    /// </summary>
    /// Created date: 22/07/2019
    /// Author:nhthai
    public class Filter
    {

        #region Property
        /// <summary>
        /// Trường Filter
        /// </summary>
        public string FieldName { get; set; }

        /// <summary>
        /// Kiểu Filter
        /// </summary>
        public Enumeration.FilterType FilterType { get; set; }

        /// <summary>
        /// Giá trị Filter
        /// </summary>
        public string FilterValue { get; set; }
        #endregion
    }
}
