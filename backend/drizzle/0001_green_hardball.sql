CREATE TABLE `subscriptions_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`endpoint` text NOT NULL,
	`expirationTime` integer,
	`p256dh` text NOT NULL,
	`auth` text NOT NULL,
	`userAgent` text,
	`createdAt` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_table_endpoint_unique` ON `subscriptions_table` (`endpoint`);