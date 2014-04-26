package com.willydupreez.personal.chaincalendar;

import java.io.File;

public class CalendarRepository {

	private final File dataDir;

	public CalendarRepository(File dataDir) {
		if (dataDir == null || !dataDir.isDirectory()) {
			throw new IllegalArgumentException("Invalid data directory" + dataDir);
		}
		this.dataDir = dataDir;
	}


}
