import {
  TransportDriver,
  TransportVehicle
} from "@things-factory/transport-base";
import { getManager } from "typeorm";
import { ORDER_STATUS } from "../../../constants";
import { CollectionOrder } from "../../../entities";
import { OrderNoGenerator } from "../../../utils";

export const dispatchCollectionOrder = {
  async dispatchCollectionOrder(_: any, { orderInfo }, context: any) {
    return await getManager().transaction(async trxMgr => {
      try {
        const foundCollectionOrder: CollectionOrder = await trxMgr
          .getRepository(CollectionOrder)
          .findOne({
            where: { domain: context.state.domain, name: orderInfo.name }
          });

        if (!foundCollectionOrder)
          throw new Error(`Collection order doesn't exists.`);
        if (foundCollectionOrder.status !== ORDER_STATUS.READY_TO_DISPATCH)
          throw new Error(`Status is not receivable.`);

        await trxMgr.getRepository(CollectionOrder).save({
          ...foundCollectionOrder,
          name: OrderNoGenerator.collectionOrder(),
          transportDriver: await trxMgr.getRepository(TransportDriver).findOne({
            domain: context.state.domain,
            id: foundCollectionOrder.transportDriver.id
          }),
          transportVehicle: await trxMgr
            .getRepository(TransportVehicle)
            .findOne({
              domain: context.state.domain,
              id: foundCollectionOrder.transportVehicle.id
            }),
          status: ORDER_STATUS.COLLECTING,
          updater: context.state.user
        });

        return foundCollectionOrder;
      } catch (e) {
        throw e;
      }
    });
  }
};
