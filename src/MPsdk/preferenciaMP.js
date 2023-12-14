import { ACCESS_TOKEN } from "../../config.json"

export const handleIntegrationMP = async (total) => {
    const preferencia = {
        "items": [
            {
                "title": `FomeZero Alimentos S.A`,
                "description": `Pagamento por Serviço`,
                "category_id": `Alimentos`,
                "quantity": 1,
                "currency_id": `BRL`,
                "unit_price": total,

                
            }
            
        ],
      
        "back_urls": {
            "success": "exp://192.168.0.101:8081/--/fomezero/Sucesso",
            "failure": "https://www.failure.com",
            "pending": "https://www.pending.com"
        },
        "auto_return": "approved",
        "payment_methods": {
            "excluded_payment_methods": [
                {
                }
            ],
            "excluded_payment_types": [
                {
                    "id": "ticket",
                  
                }
            ],
            "installments": 1
        },
    }
    

    try {
        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preferencia)
        })

        const data = await response.json()

        return data.init_point
        
    } catch (error) {
        console.log(error)
    }
}