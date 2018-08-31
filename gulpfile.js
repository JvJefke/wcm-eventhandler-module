const gulp = require("gulp");
const apidocSwagger = require("gulp-apidoc-swagger");
const angularTemplatecache = require("gulp-angular-templatecache");
const replace = require("gulp-replace");
const fs = require("fs");
const packageConfig = JSON.parse(fs.readFileSync("./package.json"));

// Generate swagger documentation
gulp.task("swagger", () => {
	apidocSwagger.exec({
		src: "app/controllers/", // To get limited frontend data replace with  'swagger/input''
		dest: "swagger/output",
		definitions: "swagger/definitions/definitions.json",
		debug: true,
	});

	return gulp.src(["./swagger/output/swagger.json"])
		.pipe(replace(/\/api\/1.0.0\//g, "/"))
		.pipe(gulp.dest("./swagger/output/acpaas"));
});

gulp.task("templateCache", () => {
	return gulp.src("./public/app/**/*.template.html")
		.pipe(angularTemplatecache({
			module: packageConfig.wcmModule.moduleConfig.angularModule + "_" + packageConfig.version,
			root: "app/modules/" + packageConfig.wcmModule.moduleConfig.angularModule  + "_" + packageConfig.version + "/public/app/",
		}))
		.pipe(gulp.dest("./public/app/template-cache"));
});

// Utility function for bumping the version at the desired level in the package.json file.
const bumpVersion = (level) => {
	const versionArr = packageConfig.version.split(".");

	versionArr[level] = "" + (parseInt(versionArr[level]) + 1);

	for (level += 1; level < versionArr.length; level++) {
		versionArr[level] = 0;
	}

	packageConfig.version = versionArr.join(".");

	fs.writeFileSync("./package.json", JSON.stringify(packageConfig, null, 4));

	return packageConfig.version;
};

const bumpAngularModuleVersion = (version) => {
	const reg = new RegExp("\"" + packageConfig.wcmModule.moduleConfig.angularModule  + "_[0-9]{1,}\\.[0-9]{1,}\\.[0-9]{1,}", "g");
	const reg2 = new RegExp("version: \"[0-9]{1,}\.[0-9]{1,}\.[0-9]{1,}\",", "g");

	return gulp.src(["./public/app/**/*.js"])
		.pipe(replace(reg, "\"" + packageConfig.wcmModule.moduleConfig.angularModule  + "_" + version))
		.pipe(replace(reg2, "version: \"" + version + "\","))
		.pipe(gulp.dest("./public/app"));

};

// Bump patch version (x.x.[patch version])
gulp.task("bumpPatch", function() {
	const newVersion = bumpVersion(2);

	return bumpAngularModuleVersion(newVersion);
});
// Bump minor version(x.[minor version].x)
gulp.task("bumpMinor", function() {
	const newVersion = bumpVersion(1);

	return bumpAngularModuleVersion(newVersion);
});
// Bump major version([magjor version].x.x)
gulp.task("bumpMajor", function() {
	const newVersion = bumpVersion(0);

	return bumpAngularModuleVersion(newVersion);
});
