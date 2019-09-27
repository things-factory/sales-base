import { Claim } from '../../../entities'
import { Equal, getRepository, In, IsNull } from 'typeorm'

export const claimOrderListResolver = {
  async claimOrderList(_: any, params: any, context: any) {
    let domainId = context.state.domain.id
    var arrOrders = await getRepository(Claim).query(`
      SELECT name AS name, delivery_date_time AS date_time from delivery_orders 
        WHERE name NOT IN (SELECT name FROM claims) AND 
        transport_vehicle_id IS NOT NULL AND 
        transport_driver_id IS NOT NULL AND
        truck_no IS NULL AND
        domain_id = '${domainId}'

      UNION
      SELECT name AS name, collection_date_time AS date_time FROM collection_orders 
        WHERE name NOT IN (SELECT name FROM claims) AND
        transport_vehicle_id IS NOT NULL AND 
        transport_driver_id IS NOT NULL AND
        truck_no IS NULL AND
        domain_id = '${domainId}'
    `)

    //Combining order date with order number.
    Object.keys(arrOrders || {}).map(key => {
      let orderDate = new Date(arrOrders[key].date_time)
      arrOrders[key].description =
        (orderDate.getMonth() + 1).toString().padStart(2, '0') +
        orderDate
          .getDate()
          .toString()
          .padStart(2, '0') +
        arrOrders[key].name
    })
    return arrOrders
  }
}
