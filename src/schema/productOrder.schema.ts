import z from 'zod';

export const prodToCartSchema = z.object({
  products: z.object({
    category: z.string(),
    combo: z.boolean(),
    cover_image: z.string(),
    description: z.string(),
    id: z.string(),
    name: z.string(),
    price: z.number(),
    comment: z.string().max(200).nullable(),
    additionals: z.string().nullish(),
  }),
  quantity: z.preprocess(val => Number(val), z.number().min(1).max(20).int()),
});

export const productOrderSchema = z.object({
  products: z.array(
    z.object({
      products_id: z.string(),
      quantity: z.number().min(0).int(),
      comment: z.string().max(200).nullish(),
      additionals: z.array(z.string().max(50)).nullish(),
    }),
  ),
  client: z.string().max(120).default('Nome não informado').nullable(),
});

export const updateOrderSchema = z.object({
  status: z.enum(['ready', 'finished', 'preparing', 'refused']),
  reason_of_refusal: z.string().max(140).optional(),
  client: z.string().max(120).nullable().default(''),
});

export const refuseOrderSchema = z.object({
  reason_of_refusal: z.string().max(140),
});

export type ProdToCartType = z.infer<typeof prodToCartSchema>;

export type ProductOrderRequestType = z.infer<typeof productOrderSchema>;

export type OrderUpdateRequestType = z.infer<typeof updateOrderSchema>;

export type RefusedOrderType = z.infer<typeof refuseOrderSchema>;
