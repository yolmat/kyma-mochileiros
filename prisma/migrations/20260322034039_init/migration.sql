-- CreateTable
CREATE TABLE "ticket" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "transaction_amount" DECIMAL(65,30) NOT NULL,
    "payment_method_id" TEXT NOT NULL,
    "id_payment" DECIMAL(65,30) NOT NULL,
    "status_payment" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_id_key" ON "ticket"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_email_key" ON "ticket"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_document_key" ON "ticket"("document");
