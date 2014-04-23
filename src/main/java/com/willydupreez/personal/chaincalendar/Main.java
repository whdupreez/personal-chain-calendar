package com.willydupreez.personal.chaincalendar;

import java.io.File;

import io.undertow.Handlers;
import io.undertow.Undertow;
import io.undertow.server.handlers.resource.FileResourceManager;

public class Main {

	public static void main(String[] args) throws Exception {
		FileResourceManager resourceManager = new FileResourceManager(new File("target-grunt/dist"), 100);
		Undertow server = Undertow.builder()
				.addHttpListener(8080, "localhost")
				.setHandler(Handlers.resource(resourceManager)
						.setDirectoryListingEnabled(true))
				.build();
		server.start();
	}

}
