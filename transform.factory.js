(function() {
    function factory() {
        console.log('factory working')
       // 1) the aggregated net_total for the entire collection of data 
        function aggregated(data) {
          if (!data) {
            return;
          }

          return data.reduce(function (previousValue, obj) {
            if (!obj.net_total) {
              return previousValue + 0;
            }
            return previousValue + obj.net_total.value;
          }, 0)

        }
       // 2) the average net_total  per guest for each unique employee.   
        function employeeStats(data) {
          if (!data) {
            return;
          }

          var stats = {};

          data.map(function (obj) {
            if (!obj.employee) {return;}

            if (!stats[obj.employee.id]) {
              stats[obj.employee.id] = {
                id: obj.employee.id,
                netTotal: obj.net_total.value, 
                guestCount: obj.guest_count,
                average: obj.net_total.value/obj.guest_count
               };
            } else {
              stats[obj.employee.id].netTotal += obj.net_total.value;
              stats[obj.employee.id].guestCount += obj.guest_count;
              stats[obj.employee.id].average = stats[obj.employee.id].netTotal/stats[obj.employee.id].guestCount;
            }
          })

          return stats;
        }

        return {
          aggregated,
          employeeStats
        };
    }
    
    angular.module('takeHomeApp').factory('transformFactory', factory)
})();
