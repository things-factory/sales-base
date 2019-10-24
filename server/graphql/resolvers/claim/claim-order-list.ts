import { Claim } from '../../../entities'
import { Equal, getRepository, In, IsNull } from 'typeorm'

export const claimOrderListResolver = {
  async claimOrderList(_: any, { transportDriver, transportVehicle }, context: any) {
    let domainId = context.state.domain.id
    let arrOrders = []
    if (transportDriver && transportVehicle && transportDriver !== '' && transportVehicle !== '') {
      arrOrders = await getRepository(Claim).query(`
        select delOrd.id, delOrd.name AS name from transport_order_details transportOrd
          inner join delivery_orders delOrd on delOrd.id = transportord.delivery_order_id and delOrd.domain_id = transportOrd.domain_id
          where delOrd.name NOT IN (SELECT name FROM claim_orders) AND 
          truck_no IS NULL AND delOrd.domain_id = '${domainId}' AND
          transport_driver_id = '${transportDriver}' and transport_vehicle_id = '${transportVehicle}'
        UNION
        select colOrd.id, colOrd.name AS name from transport_order_details transportOrd
          inner join collection_orders colOrd on colOrd.id = transportord.collection_order_id and colOrd.domain_id = transportOrd.domain_id
          where colOrd.name NOT IN (SELECT name FROM claim_orders) AND 
          truck_no IS NULL AND colOrd.domain_id = '${domainId}' AND
          transport_driver_id = '${transportDriver}' and transport_vehicle_id = '${transportVehicle}'  
      `)
    }
    return arrOrders
  }
}
