import { db, type CartItemWithProduct } from '~/db/schema';
import { eq } from 'drizzle-orm';
import { getCartDb } from './getCartDb';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export async function getCartItemsDb(
    cookies: ReadonlyRequestCookies,
): Promise<CartItemWithProduct[]> {
    const cart = await getCartDb(cookies);
    if (!cart) {
        return [];
    }
    return await db.query.cartItemTable.findMany({
        where: (cartItems) => eq(cartItems.cartId, cart.id),
        with: {
            product: true,
        },
    });
}
