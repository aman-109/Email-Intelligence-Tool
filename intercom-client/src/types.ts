export type ShipmentFilterType = "all" | "assigned"

export type Shipment = {
    id: string;
    alias: string;
    cargowiseId?: string;
    mode: 'Air' | 'Sea';
    freightClass: 'FCL' | 'LCL' | 'AirCargo' | 'AirCourier';
    originAddress: string;
    destinationAddress: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    goGreen: boolean;
};

export type User = {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "sales" | "ops" | "finance";
    createdAt: string;
};

export type Email = {
    id: string;
    from: string;
    to: string;
    subject: string
    body: string;
    attachments?: string[]
    shipmentId: string;
    timestamp: string;
    tone?: string;
    reply?: string;
    eventKeys?: string
    threadEmails: {
        id: string
        from: string
        body: string
        parentId: string
        timestamp: string
        tone?: string;
        reply?: string;
        eventKeys?: string
    }[]
};

export type Attachment = {
    id: string
    shipmentId: string
    type: "application/pdf" | "image/png",
    name: string
    gmailAttachmentId: string
    timestamp: string
    from: string
}

export type Users = {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "sales" | "ops" | "finance";
    createdAt: string;
}[];

export type Enqiry = {
    alias:string,
    leadType: string;
    client: string;
    organizationName: string;
    POC: string;
    phoneNumber: string;
    email: string;
    mode: string;
    movementType: string;
    freightClass: string;
    incoterms: string;
    goGreen: boolean;
    productDescription: string;
    hsCode: string;
    freightPayment: string;
    additionalServices: string;
  }
